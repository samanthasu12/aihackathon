// src/components/LandingView.tsx
import React, { useEffect, useState } from "react";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import { StopIcon } from "@heroicons/react/24/solid";

export const LandingView: React.FC = () => {
    const phrases = [
        "What are you feeling today?",
        "What's your budget?",
        "Share your dietary preferences.",
    ];

    const [displayedText, setDisplayedText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    // per-character delays
    const [typingDelay, setTypingDelay] = useState(150);
    const [deletingDelay, setDeletingDelay] = useState(100);

    // Random helper
    const randBetween = (min: number, max: number) =>
        Math.random() * (max - min) + min;

    // Recompute delays and reset when phraseIndex changes
    useEffect(() => {
        const current = phrases[phraseIndex];
        const totalTyping = randBetween(1500, 2500);
        const totalDeleting = randBetween(900, 1100);

        setTypingDelay(Math.max(50, totalTyping / current.length));
        setDeletingDelay(Math.max(50, totalDeleting / current.length));

        setSubIndex(0);
        setDeleting(false);
        setDisplayedText("");
    }, [phraseIndex]);

    // Typing/deleting effect with new pauses
    useEffect(() => {
        const current = phrases[phraseIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && subIndex < current.length) {
            // typing
            timeout = setTimeout(() => {
                setDisplayedText(current.slice(0, subIndex + 1));
                setSubIndex((i) => i + 1);
            }, typingDelay);

        } else if (!deleting && subIndex === current.length) {
            // PAUSE 1.2s before deleting
            timeout = setTimeout(() => setDeleting(true), 1200);

        } else if (deleting && subIndex > 0) {
            // deleting
            timeout = setTimeout(() => {
                setDisplayedText(current.slice(0, subIndex - 1));
                setSubIndex((i) => i - 1);
            }, deletingDelay);

        } else if (deleting && subIndex === 0) {
            // PAUSE 0.8s before next phrase
            timeout = setTimeout(() => {
                setDeleting(false);
                setPhraseIndex((i) => (i + 1) % phrases.length);
            }, 800);
        }

        return () => clearTimeout(timeout);
    }, [subIndex, deleting, phraseIndex, typingDelay, deletingDelay]);

    const [isRecording, setIsRecording] = useState(false);
    const handleButtonClick = () => {
        setIsRecording((prev) => !prev);
        // TODO: start/stop real recording logic here
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
            <h1 className="w-full text-center text-white text-3xl sm:text-5xl font-bold -mt-8 mb-8">
                {displayedText}
                <span className="inline-block w-1 h-8 bg-white animate-pulse ml-1 align-bottom" />
            </h1>
            <div className="text-center space-y-2 mb-8">
                <p className="text-gray-400 text-lg">No entries yet.</p>
                <p className="text-gray-500">Tap below to add your first entry.</p>
            </div>

            <button
                onClick={handleButtonClick}
                className="
            relative
          mt-4
          flex items-center justify-center
          sm:w-auto
          px-6 sm:px-8 py-3 sm:py-4
          bg-sky-500 hover:bg-sky-600
          text-white font-medium
          text-base sm:text-lg
          rounded-full
          focus:outline-none focus:ring-2 focus:ring-sky-400
          transition-transform transition-opacity duration-150 ease-in-out
          active:scale-95 active:opacity-80
        "
            >
                <div
                    className={`
            flex items-center transition-opacity duration-300 ease-in-out
            ${isRecording ? "opacity-0" : "opacity-100"}
          `}
                >
                    <span className="mr-2">Start</span>
                    <MicrophoneIcon className="h-6 w-6" />
                </div>
                <div
                    className={`
            absolute inset-0 flex items-center justify-center
            transition-opacity duration-300 ease-in-out
            ${isRecording ? "opacity-100" : "opacity-0"}
          `}
                >
                    <StopIcon className="h-6 w-6" />
                </div>
            </button>
        </div>
    );
};
