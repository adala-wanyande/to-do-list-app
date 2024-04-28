"use client";

import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import TaskList from "@/components/TaskList";
import AddNewItemButton from "@/components/AddNewItemButton";
import { AddNewItemModal } from "@/components/AddNewItemModal";
import { createClient } from "@/utils/supabase/client";

interface Task {
  id: number;
  title: string;
  label: string;
  priority: string;
  is_complete: boolean;
}

const Home = () => {
  const [isItemModalOpen, setItemModalOpen] = useState<boolean>(false);
  const [activeTag, setActiveTag] = useState<string>("All");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("tasks").select("*");
        if (error) {
          throw error;
        }
        setTasks(data || []);
      } catch (error: any) {
        console.error("Failed to fetch tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isItemModalOpen, activeTag]); // Re-fetch tasks when the modal closes or activeTag changes

  const handleModalClose = useCallback(() => {
    setItemModalOpen(false);
  }, []);

  const handleComplete = async (taskId: number) => {
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (updatedTask) {
      const newCompleteState = !updatedTask.is_complete; // Toggle the state
      const { error } = await supabase
        .from("tasks")
        .update({ is_complete: newCompleteState }) // Update with new state
        .eq("id", taskId);

      if (error) {
        console.error("Failed to update task completion:", error.message);
      } else {
        setTasks(
          tasks.map((task) =>
            task.id === taskId
              ? { ...task, is_complete: newCompleteState }
              : task
          )
        );
      }
    }
  };

  const handleDelete = async (taskId: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      console.error("Failed to delete task:", error.message);
    } else {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const filteredTasks = tasks.filter(
    (task) => activeTag === "All" || task.label === activeTag
  );
  const incompleteTasks = filteredTasks.filter((task) => !task.is_complete);
  const completedTasks = filteredTasks.filter((task) => task.is_complete);

  if (loading) {
    return (
      <div className="full-screen-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl p-4 bg-primary">
        Lo-Fi To-Do List App
      </h1>
      <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
        (Best viewed on mobile)
      </h2>
      <Navbar tasks={tasks} onTagSelect={setActiveTag} activeTag={activeTag} />
      <div className="w-full">
        <h4 className="text-xl font-semibold p-4">Incomplete Tasks</h4>
        <TaskList
          isIncomplete={true}
          tasks={incompleteTasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      </div>
      <div className="w-full mb-24">
        <h4 className="text-xl font-semibold p-4">Completed Tasks</h4>
        <TaskList
          isIncomplete={false}
          tasks={completedTasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      </div>
      <div className="fixed-bottom h-24">
        <AddNewItemButton onClick={() => setItemModalOpen(true)} />
      </div>
      {isItemModalOpen && (
        <AddNewItemModal isOpen={isItemModalOpen} onClose={handleModalClose} />
      )}
    </>
  );
};

export default Home;
