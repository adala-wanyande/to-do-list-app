import { useState, FormEvent } from "react";
import { createClient } from "../utils/supabase/client"; // Update the path to your Supabase client

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddNewItemModal = ({ isOpen, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const supabase = createClient();

  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};

    if (!title.trim()) formErrors.title = "Title is required.";
    if (!label.trim()) formErrors.label = "Label is required.";
    if (!priority.trim()) formErrors.priority = "Priority is required.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0; // If no errors, validation is successful
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return; // Prevent submission if validation fails

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, label, priority }]);

    if (error) {
      console.error("Error adding new task:", error);
    } else {
      setTitle("");
      setLabel("");
      setPriority("");
      onClose(); // Close the modal on successful submission
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 p-5 border shadow-lg rounded-md bg-[#D9D9D9] m-4">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Add New Task
          </h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-2 border rounded ${
                  errors.title ? "border-red-500" : ""
                }`}
                required
              />
              {errors.title && (
                <p className="text-red-500 text-xs italic">{errors.title}</p>
              )}
              <input
                type="text"
                name="label"
                placeholder="Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className={`w-full p-2 border rounded ${
                  errors.label ? "border-red-500" : ""
                }`}
                required
              />
              {errors.label && (
                <p className="text-red-500 text-xs italic">{errors.label}</p>
              )}
              <input
                type="text"
                name="priority"
                placeholder="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`w-full p-2 border rounded ${
                  errors.priority ? "border-red-500" : ""
                }`}
                required
              />
              {errors.priority && (
                <p className="text-red-500 text-xs italic">{errors.priority}</p>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-white py-2 px-4 rounded-md text-black hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black py-2 px-4 rounded-md text-white hover:bg-black-600"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
