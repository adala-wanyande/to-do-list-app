import React from "react";
import { CircleCheck, Flag, Trash2 } from "lucide-react";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    label: string;
    priority: string;
    is_complete: boolean;
  };
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const CompleteTaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
  const handleCompletionClick = () => {
    onComplete(task.id);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="flex justify-between items-center p-4 m-4 bg-[#D9D9D9] shadow rounded-lg opacity-50 line-through">
      <button onClick={handleCompletionClick}>
          <CircleCheck className="ml-4 h-6 w-6 text-green-500" />
      </button>
      <p className="font-medium text-lg">{task.title}</p>
      <p className="font-normal text-xs">({task.label})</p>
      <Flag className={`${getPriorityColor()} h-5 w-5`} />
      <button onClick={handleDeleteClick}>
        <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700 mr-4" />
      </button>
    </div>
  );
};

export default CompleteTaskItem;
