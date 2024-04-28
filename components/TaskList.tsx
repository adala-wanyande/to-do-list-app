// components/TaskList.tsx
import React from "react";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: {
    id: number;
    title: string;
    label: string; // Assuming label is just a string, adjust if it's more complex
    priority: string;
    isComplete: boolean;
  }[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
