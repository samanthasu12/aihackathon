import { useEffect, useState } from "react";
import type { Preference } from "./types";
import GroupPreferencesList from "./components/group_preference_list";
import AddPreferenceForm from "./components/add_preference_form";

const App = () => {
  const [preferences, setPreferences] = useState<Preference[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/preferences")
      .then(res => res.json())
      .then(data => setPreferences(data))
      .catch(err => console.error("Failed to fetch preferences:", err));
  }, []);

  const handleAddPreference = async (pref: Preference) => {
    try {
      const res = await fetch("http://localhost:3001/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pref)
      });

      const result = await res.json();
      if (result.message === "Added preference!") {
        setPreferences(prev => [...prev, pref]);
      } else {
        console.error("Failed to add preference:", result);
      }
    } catch (error) {
      console.error("Error adding preference:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">🍽️ Group Food Recommender</h1>
      <GroupPreferencesList preferences={preferences} />
      <div className="mt-6">
        <AddPreferenceForm onAdd={handleAddPreference} />
      </div>
    </div>
  );
};

export default App
