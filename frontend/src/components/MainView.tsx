// src/components/MainView.tsx
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useUserEntryStore } from "../stores/UserEntryStore";
import { EntryList } from "./EntryList";
import { EditModal } from "./EditModal";
import type { EntryFields } from "../types";

export const MainView: React.FC = observer(() => {
  const store = useUserEntryStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  // Open modal for both edit *and* delete icon clicks
  const openModal = (id: string) => setEditingId(id);
  const closeModal = () => setEditingId(null);

  // Called when you hit “Save” in the modal
  const handleSave = (id: string, updated: EntryFields) => {
    store.updateEntry(id, updated);
  };

  // Called when you hit “Delete” in the modal
  const handleDeleteConfirm = (id: string) => {
    store.removeEntry(id);
  };

  // Submit button
  const handleSubmit = () => {
    store.submitEntries();
  };

  // Find the entry we’re editing
  const editingItem = editingId
    ? store.allEntries.find((e) => e.id === editingId) ?? null
    : null;

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-white text-2xl sm:text-3xl font-semibold mb-6 text-center">
        Entries
      </h1>

      {/* List + Submit */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg space-y-4">
        {/* Now both icons just open the modal */}
        <EntryList
          entries={store.allEntries}
          onEdit={openModal}
          onDelete={openModal}
        />

        <button
          onClick={handleSubmit}
          className="
            w-full h-14
            bg-blue-600 hover:bg-blue-500
            text-white
            rounded-lg shadow
            transition-colors
          "
        >
          Submit
        </button>
      </div>

      {/* Edit/Delete Modal */}
      {editingItem && (
        <EditModal
          isOpen={!!editingId}
          onClose={closeModal}
          id={editingId!}
          entry={editingItem.entry}
          onSave={handleSave}
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
});
