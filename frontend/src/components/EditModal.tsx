// src/components/EditModal.tsx
import React, { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import type { EntryFields } from "../types";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  entry: EntryFields;
  onSave: (id: string, updated: EntryFields) => void;
  onDelete: (id: string) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  id,
  entry,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState(entry.name);
  const [description, setDescription] = useState(entry.description);

  useEffect(() => {
    if (isOpen) {
      setName(entry.name);
      setDescription(entry.description);
    }
  }, [isOpen, entry]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        {/* backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-60"
          leave="ease-in duration-200"
          leaveFrom="opacity-60"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black" />
        </TransitionChild>

        {/* dialog panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="
                  w-full max-w-md transform overflow-hidden
                  rounded-2xl bg-gray-800 p-6
                  text-left align-middle shadow-xl transition-all
                "
              >
                <DialogTitle className="text-lg font-medium text-gray-100">
                  Edit: {entry.name}
                </DialogTitle>

                {/* name input */}
                <div className="mt-4">
                  <label className="block text-sm text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                      w-full rounded bg-gray-700 px-3 py-2
                      text-gray-100 focus:outline-none focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </div>

                {/* description textarea */}
                <div className="mt-4">
                  <label className="block text-sm text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="
                      w-full h-32 max-h-60 overflow-y-auto
                      rounded bg-gray-700 px-3 py-2
                      text-gray-100 focus:outline-none focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </div>

                {/* actions */}
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="
                      px-4 py-2 rounded
                      bg-gray-600 text-gray-200 hover:bg-gray-500
                    "
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(id);
                      onClose();
                    }}
                    className="
                      px-4 py-2 rounded
                      bg-red-600 text-white hover:bg-red-700
                    "
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSave(id, { name, description });
                      onClose();
                    }}
                    className="
                      px-4 py-2 rounded
                      bg-blue-600 text-white hover:bg-blue-700
                    "
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
