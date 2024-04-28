import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Props {
  onClick: () => void; // Prop for clicking the button
}

const AddNewItemButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button className="w-full h-full" onClick={onClick}>
      <span className="mr-2 text-xl">Add New Item</span>
      <Plus className="h-4 w-4" />
    </Button>
  );
};

export default AddNewItemButton;
