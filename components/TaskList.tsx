import React from "react";
import TaskItem from "./IncompleteTaskItem";
import IncompleteTaskItem from "./IncompleteTaskItem";
import CompleteTaskItem from "./CompleteTaskItem";

interface TaskListProps {
  tasks: {
    id: number;
    title: string;
    label: string; // Assuming label is just a string, adjust if it's more complex
    priority: string;
    is_complete: boolean;
  }[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  isIncomplete: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  isIncomplete,
  tasks,
  onComplete,
  onDelete,
}) => {
  const renderTaskItems = () => {
    if (isIncomplete) {
      return (
        <div>
          {tasks.map((task) => (
            <IncompleteTaskItem
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      );
    } else if (isIncomplete == false) {
      return (
        <div>
          {tasks.map((task) => (
            <CompleteTaskItem
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      );
    }
  };
  return renderTaskItems();
};

export default TaskList;
