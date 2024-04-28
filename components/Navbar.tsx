"use client";
import { useEffect, useState, useMemo } from "react";

interface NavbarProps {
  onTagSelect: (tag: string) => void;
  activeTag: string;
  tasks: Array<{
    id: number;
    title: string;
    label: string;
    priority: string;
    is_complete: boolean;
  }>;
}

const Navbar = ({ onTagSelect, activeTag, tasks }: NavbarProps) => {
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Extract unique labels using useMemo to avoid recalculations on each render
  const labels = useMemo(() => {
    const labelSet = new Set(tasks.map((task) => task.label));
    return ["All", ...Array.from(labelSet)];
  }, [tasks]);

  useEffect(() => {
    setIsLoading(tasks.length === 0); // Determine loading state based on tasks
  }, [tasks]);

  return (
    <nav className="items-center p-4 w-full">
      <h4 className="text-xl font-semibold tracking-tight py-4">Tags</h4>
      <div className="flex items-center space-x-4 mt-2 overflow-x-auto w-full">
        {isLoading ? (
          <div>Loading tags...</div>
        ) : (
          labels.map((label, index) => (
            <a
              key={index}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onTagSelect(label);
              }}
              className={`${
                activeTag === label ? "bg-primary text-black" : "text-black"
              } cursor-pointer p-2 px-4 mb-4 rounded hover:bg-primary whitespace-nowrap`}
            >
              {label}
            </a>
          ))
        )}
      </div>
    </nav>
  );
};

export default Navbar;
