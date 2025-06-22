import { makeAutoObservable } from "mobx";
import type { EntryFields } from "../types";

class UserEntryStore {
    entries: EntryFields[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get allEntries(){
        return this.entries;
    }

    addEntry(entry: EntryFields){
        this.entries.push(entry);
    }

    removeEntry(index: number){
        this.entries.splice(index, 1);
    }

    *submitEntries(){
        
    }
}