// src/components/EntryList.tsx
import React from "react";
import { Entry } from "./Entry";
import type { EntryFields } from "../types";

export interface EntryListProps {
  /** The array of entries to render */
  entries: { id: string; entry: EntryFields }[];
  /** Called when the user taps the edit icon on an entry */
  onEdit: (id: string) => void;
  /** Called when the user taps the delete icon on an entry */
  onDelete: (id: string) => void;
}

export const EntryList: React.FC<EntryListProps> = ({
  entries,
  onEdit,
  onDelete,
}) => (
  <div
    className="
      w-full 
      overflow-y-auto 
      max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh]
      space-y-4
    "
  >
    {entries.map((item) => (
      <Entry
        key={item.id}
        id={item.id}
        entry={item.entry}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);
