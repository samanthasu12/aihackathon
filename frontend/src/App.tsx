import { useEffect, useState } from "react";
import type { Preference } from "./types";
import GroupPreferencesList from "./components/group_preference_list";
import { recordAndTranscribe } from "./utils/speechToText";
import { StoreProvider, useUserEntryStore } from "./stores/UserEntryStore";
import { EntryList } from "./components/EntryList";
import { LandingView } from "./components/LandingView";
import { MainView } from "./components/MainView";

const App = () => {
  const store = useUserEntryStore();
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [inputs, setInputs] = useState<string[]>([]);
  const [recording, setRecording] = useState<number | null>(null);
  const [countdowns, setCountdowns] = useState<number[]>([]);
  const [numPeople, setNumPeople] = useState<number | null>(null);
  const [submittedPeopleCount, setSubmittedPeopleCount] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/preferences")
      .then(res => res.json())
      .then(data => setPreferences(data))
      .catch(err => console.error("Failed to fetch preferences:", err));
  }, []);

  const handleAddPreference = async () => {
    const trimmedInputs = inputs.map(input => input.trim()).filter(Boolean);
    if (trimmedInputs.length === 0) return;

    for (const name of trimmedInputs) {
      try {
        const res = await fetch("http://localhost:3001/api/preferences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        const result = await res.json();
        if (result.message === "Added preference!") {
          setPreferences(prev => [...prev, { name }]);
        } else {
          console.error("Failed to add preference:", result);
        }
      } catch (error) {
        console.error("Error adding preference:", error);
      }
    }

    setInputs(Array(numPeople || 0).fill(""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //handleAddPreference();
    store.submitInputs(inputs);
  };

  const handleMicClick = async (index: number) => {
    const newCountdowns = [...countdowns];
    newCountdowns[index] = 5;
    setCountdowns(newCountdowns);
    setRecording(index);

    const countdownInterval = setInterval(() => {
      setCountdowns(prev => {
        const updated = [...prev];
        if (updated[index] <= 1) {
          clearInterval(countdownInterval);
        }
        updated[index] -= 1;
        return updated;
      });
    }, 1000);

    const text = await recordAndTranscribe();
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
    setRecording(null);
  };

  const handlePeopleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numPeople || numPeople < 1) return;
    setInputs(Array(numPeople).fill(""));
    setCountdowns(Array(numPeople).fill(0));
    setSubmittedPeopleCount(true);
  };
  

  return (
    // <div className="min-h-screen bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100 flex justify-center items-center py-12 px-4">
    //   <div className="absolute inset-0 overflow-hidden z-0">
    //     {["🍣", "🍜", "🌮", "🍩", "🍕", "🍔", "🥗", "🥟", "🍝", "🍦", "🍇", "🍓", "🍍", "🍛", "🧁", "🥘"].map((emoji, idx) => (
    //       <span
    //         key={idx}
    //         className="floating-emoji"
    //         style={{
    //           top: `${Math.random() * 100}%`,
    //           left: `${Math.random() * 100}%`,
    //           animationDelay: `${Math.random() * 5}s`,
    //           animationDuration: `${5 + Math.random() * 5}s`,
    //           position: "absolute",
    //           fontSize: "2rem",
    //           opacity: 0.4,
    //           pointerEvents: "none",
    //           animation: "float 6s ease-in-out infinite"
    //         }}
    //       >
    //         {emoji}
    //       </span>
    //     ))}
    //   </div>

    //   <div className="max-w-3xl w-full shadow-xl rounded-3xl bg-white/70 backdrop-blur-md p-10 border border-[#f3e3d3] z-10 relative">
    //     <header className="text-center mb-8">
    //       <h1 className="text-4xl font-extrabold text-[#e76f51] mb-2">Big Backtivity</h1>
    //       <p className="text-gray-700 max-w-2xl mx-auto">
    //         <strong>Big Backtivity</strong> is a simple way for groups to figure out what to eat together.
    //         Everyone just shares what they’re craving—maybe ramen, vegan tacos, or “literally anything but mushrooms.”
    //         You can type it out or say it out loud, and the app gathers everyone’s preferences in one place.
    //         No more endless group chats or indecisive loops—just an easier way to agree on dinner.
    //       </p>
    //       <p className="text-gray-700 mt-4 max-w-2xl mx-auto italic">
    //         This project was born out of one universal truth: we were all really, really hungry. As a group
    //         of unapologetic foodies, we realized that deciding on dinner with friends shouldn’t be so complicated.
    //         So we built Big Backtivity to turn our collective cravings into ACTUALLY GOOD final decisions. No more
    //         “I don’t know, what do *you* want?", because we all know that's a lie.
    //       </p>
    //     </header>

    //     {!submittedPeopleCount ? (
    //       <form onSubmit={handlePeopleSubmit} className="flex flex-col items-center gap-4">
    //         <label className="text-xl font-medium">How many people are deciding?</label>
    //         <input
    //           type="number"
    //           min="1"
    //           value={numPeople || ""}
    //           onChange={e => setNumPeople(parseInt(e.target.value))}
    //           className="border p-2 rounded-md text-center"
    //         />
    //         <button type="submit" className="bg-[#e76f51] text-white px-4 py-2 rounded-xl shadow hover:bg-[#d4553d] transition-colors">
    //           Continue
    //         </button>
    //       </form>
    //     ) : (
    //       <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center justify-center gap-6">
    //         <h2 className="text-2xl font-semibold text-[#2d2d2d]">Group Preferences</h2>
    //         {inputs.map((val, idx) => (
    //           <div key={idx} className="w-full max-w-2xl flex flex-col gap-2">
    //             <label className="font-medium">Person {idx + 1} - What are you craving?</label>
    //             <textarea
    //               value={val}
    //               onChange={e => {
    //                 const newInputs = [...inputs];
    //                 newInputs[idx] = e.target.value;
    //                 setInputs(newInputs);
    //               }}
    //               rows={6}
    //               className="w-full border border-[#e0c9b9] bg-white p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e76f51] resize-none"
    //             />
    //             <button
    //               type="button"
    //               onClick={() => handleMicClick(idx)}
    //               disabled={recording === idx}
    //               className="px-6 py-2 bg-[#f4e0d9] text-[#2d2d2d] font-medium border border-[#e0c9b9] rounded-xl hover:bg-[#e76f51] hover:text-white transition-colors w-fit"
    //             >
    //               {recording === idx ? `Recording... (${countdowns[idx]})` : "Voice-to-text 🎤"}
    //             </button>
    //           </div>
    //         ))}
    //         <button
    //           type="submit"
    //           className="px-6 py-3 mt-2 bg-[#e76f51] text-white font-semibold text-lg rounded-xl shadow hover:bg-[#d4553d] transition-colors"
    //         >
    //           Submit
    //         </button>
    //       </form>
    //     )}

    //     <div className="mt-10">
    //       <GroupPreferencesList preferences={preferences} />
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 h-screen w-screen overflow-hidden">
      <StoreProvider>
        {store.allEntries.length === 0 ? <LandingView /> : <MainView />}
      </StoreProvider>
    </div>
  );
};

export default App;
