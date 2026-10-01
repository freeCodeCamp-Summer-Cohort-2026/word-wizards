"use client";

import { ArrowRightIcon, CheckIcon, SpeakerHighIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { ThemeChoice } from "@/lib/onboarding/types";

interface Step7FirstLessonProps {
  isSubmitting?: boolean;
  onGoToDashboard: () => void;
  onStartLesson: () => void;
  theme?: ThemeChoice;
}

export function Step7FirstLesson({
  theme = "animals",
  onStartLesson,
  onGoToDashboard,
  isSubmitting = false,
}: Step7FirstLessonProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const playPronunciation = () => {
    setIsPlayingAudio(true);
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("dog");
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 800);
    }
  };

  const lessonObjectives = [
    "Learn new vocabulary",
    "See and hear the words",
    "Practice spelling",
    "Build your confidence",
  ];

  const themeLabel = theme === "surprise_me" ? "Featured" : theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="text-left">
        <h2 className="font-heading text-xl font-bold tracking-tight text-[#111a46] sm:text-2xl">
          Let&apos;s get started!
        </h2>
        <p className="mt-1 text-xs text-[#64748b] sm:text-sm">
          Here&apos;s your first lesson: <strong className="text-[#111a46]">{themeLabel} — Meet the Words</strong>
        </p>
      </div>

      {/* Lesson Vocab Preview Card */}
      <div className="mt-6 flex flex-col overflow-hidden rounded-3xl border border-[#e7e3f3] bg-white shadow-sm sm:flex-row">
        {/* Photo / Visual Container */}
        <div className="relative flex h-48 items-center justify-center bg-gradient-to-tr from-amber-100 via-amber-50 to-orange-100 sm:h-auto sm:w-2/5">
          <div className="flex flex-col items-center">
            <span className="text-6xl drop-shadow-md">🐕</span>
            <span className="mt-2 rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 shadow-sm">
              Vocabulary Card
            </span>
          </div>
        </div>

        {/* Word Info & Audio */}
        <div className="flex flex-1 flex-col justify-center p-5 text-left">
          <div className="flex items-center gap-3">
            <h3 className="font-heading text-2xl font-black tracking-tight text-[#111a46]">dog</h3>
            <button
              aria-label="Listen to pronunciation of dog"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f1ff] text-[#6c4cf6] transition-all hover:bg-[#ede9ff] active:scale-95"
              onClick={playPronunciation}
              type="button"
            >
              <SpeakerHighIcon
                className={isPlayingAudio ? "animate-pulse text-[#4f46e5]" : ""}
                size={18}
                weight="bold"
              />
            </button>
          </div>

          <p className="mt-0.5 font-mono text-xs text-[#64748b]">/dɒɡ/</p>
          <p className="mt-2 text-xs text-[#475569] leading-relaxed">
            A domesticated animal that is often kept as a pet or working companion.
          </p>
        </div>
      </div>

      {/* In this lesson you will list */}
      <div className="mt-5 rounded-2xl border border-[#f0edff] bg-[#faf9ff] p-4 text-left">
        <p className="text-xs font-bold text-[#111a46]">In this lesson you will:</p>
        <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {lessonObjectives.map((obj) => (
            <div className="flex items-center gap-2" key={obj}>
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckIcon size={10} weight="bold" />
              </div>
              <span className="text-xs text-[#334155]">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-7 flex flex-col items-center gap-3">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6c4cf6] py-3.5 text-base font-semibold text-white shadow-[0_6px_20px_rgba(108,76,246,0.3)] transition-all duration-200 hover:bg-[#5b3fe0] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
          disabled={isSubmitting}
          onClick={onStartLesson}
          type="button"
        >
          <span>{isSubmitting ? "Finalizing setup..." : "Start Lesson"}</span>
          {!isSubmitting && <ArrowRightIcon size={18} weight="bold" />}
        </button>

        <button
          className="text-xs font-semibold text-[#64748b] transition-colors hover:text-[#111a46] hover:underline"
          disabled={isSubmitting}
          onClick={onGoToDashboard}
          type="button"
        >
          Maybe later, go to dashboard
        </button>
      </div>
    </div>
  );
}
