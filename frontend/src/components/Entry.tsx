import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { EntryFields } from "../types";

export interface EntryProps {
  id: string;
  entry: EntryFields;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Entry: React.FC<EntryProps> = ({
  id,
  entry,
  onEdit,
  onDelete,
}) => (
  <div
    className="
      h-14 flex items-center justify-between
      bg-gray-800 hover:bg-gray-700
      rounded-lg shadow
      px-4
      transition-colors
    "
  >
    {/* Label */}
    <span className="flex-1 text-white text-base truncate">
      {entry.name}
    </span>

    {/* Icon buttons */}
    <div className="flex space-x-2">
      <button
        onClick={() => onEdit(id)}
        aria-label="Edit entry"
        className="
          w-8 h-8 flex items-center justify-center
          bg-blue-600 hover:bg-blue-500
          rounded-md
          transition-colors
        "
      >
        <PencilIcon className="h-5 w-5 text-white" />
      </button>
      <button
        onClick={() => onDelete(id)}
        aria-label="Delete entry"
        className="
          w-8 h-8 flex items-center justify-center
          bg-red-600 hover:bg-red-500
          rounded-md
          transition-colors
        "
      >
        <TrashIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  </div>
);
