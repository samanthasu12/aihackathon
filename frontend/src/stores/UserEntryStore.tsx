import { makeAutoObservable } from "mobx";
import type { EntryFields } from "../types";
import { createContext, useContext } from "react";
import { sendToLettaAgent } from "../utils/makeLettaCall";

class UserEntryStore {
    entries: {id: string, entry: EntryFields}[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get allEntries(){
        return this.entries;
    }

    addEntry(entry: EntryFields){
        this.entries.push({
            id: Date.now().toString(),
            entry: entry,
        });
    }

    removeEntry(id: string){
        this.entries = this.entries.filter((i) => i.id !== id);
    }

    updateEntry(id: string, newEntry: EntryFields){
        const entry = this.entries.find((i) => i.id === id);
        if(entry) entry.entry = newEntry;
    }

    *submitEntries(){
        // fetch
    }

    *submitInputs(entries: string[]){
        console.log(yield sendToLettaAgent("The following sentences are requirements from several people:" + entries.join("."),""));
    }
}

const userEntryStore = new UserEntryStore();

const StoreContext = createContext<UserEntryStore>(userEntryStore);

export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <StoreContext.Provider value={userEntryStore}>{children}</StoreContext.Provider>
);

export const useUserEntryStore = () => useContext(StoreContext);
