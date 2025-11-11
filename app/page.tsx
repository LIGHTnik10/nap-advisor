"use client";

import { useState, useEffect } from "react";
import { getNapRecommendation, NapRecommendation } from "@/lib/napLogic";

export default function Home() {
  const [currentHour, setCurrentHour] = useState<number>(12);
  const [tirednessLevel, setTirednessLevel] = useState<number>(5);
  const [age, setAge] = useState<number>(25);
  const [recommendation, setRecommendation] =
    useState<NapRecommendation | null>(null);

  // Set current hour on mount
  useEffect(() => {
    const now = new Date();
    setCurrentHour(now.getHours());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = getNapRecommendation({
      currentHour,
      tirednessLevel,
      age,
    });
    setRecommendation(result);
  };

  const getTirednessLabel = (level: number): string => {
    if (level <= 2) return "Wide Awake";
    if (level <= 4) return "Slightly Tired";
    if (level <= 6) return "Moderately Tired";
    if (level <= 8) return "Very Tired";
    return "Exhausted";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
            💤 Nap Advisor
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Smart nap recommendations based on science
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Current Time: {currentHour}:00 (
                {currentHour >= 12
                  ? currentHour === 12
                    ? "12"
                    : currentHour - 12
                  : currentHour}{" "}
                {currentHour >= 12 ? "PM" : "AM"})
              </label>
              <input
                type="range"
                min="0"
                max="23"
                value={currentHour}
                onChange={(e) => setCurrentHour(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>12 AM</span>
                <span>6 AM</span>
                <span>12 PM</span>
                <span>6 PM</span>
                <span>11 PM</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                How Tired Are You? {tirednessLevel}/10 -{" "}
                {getTirednessLabel(tirednessLevel)}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={tirednessLevel}
                onChange={(e) => setTirednessLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Wide Awake</span>
                <span>Exhausted</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Your Age
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your age"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Should I Nap?
            </button>
          </form>
        </div>

        {recommendation && (
          <div
            className={`rounded-2xl shadow-xl p-8 ${
              recommendation.shouldNap
                ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700"
                : "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-700"
            }`}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {recommendation.shouldNap ? "✅" : "❌"}
              </div>
              <h2
                className={`text-3xl font-bold mb-2 ${
                  recommendation.shouldNap
                    ? "text-green-800 dark:text-green-300"
                    : "text-red-800 dark:text-red-300"
                }`}
              >
                {recommendation.shouldNap
                  ? "Yes, Take a Nap!"
                  : "No, Skip the Nap"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {recommendation.reason}
              </p>
            </div>

            {recommendation.shouldNap && (
              <div className="space-y-4 mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Recommended Nap Duration
                  </h3>
                  <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-2">
                    {recommendation.recommendedDuration} min
                  </div>
                  <div className="text-center text-gray-600 dark:text-gray-400">
                    Optimal for your situation
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Flexible Range
                  </h3>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Minimum
                      </div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {recommendation.minDuration} min
                      </div>
                    </div>
                    <div className="text-3xl text-gray-400">↔</div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Maximum
                      </div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {recommendation.maxDuration} min
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {recommendation.warning && (
              <div className="mt-6 bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">⚠️</span>
                  <p className="text-yellow-800 dark:text-yellow-300 font-medium">
                    {recommendation.warning}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🧠 The Science Behind Your Recommendation
          </h2>

          <div className="space-y-6">
            {/* Time Windows */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">🕐</span>
                Optimal Nap Windows
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <div className="font-semibold text-red-800 dark:text-red-300">
                    Before 11 AM ❌
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Too early - disrupts sleep schedule
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <div className="font-semibold text-green-800 dark:text-green-300">
                    11 AM - 3 PM ✅
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Perfect! Natural circadian dip
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <div className="font-semibold text-yellow-800 dark:text-yellow-300">
                    3 PM - 5 PM ⚠️
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Power naps only (under 20 min)
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <div className="font-semibold text-red-800 dark:text-red-300">
                    After 5 PM ❌
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Will cause insomnia tonight
                  </div>
                </div>
              </div>
            </div>

            {/* Age-Based Durations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">👶👨👴</span>
                Age-Based Sleep Needs
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Infants (0-2 years)
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      90 min
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Toddlers (2-5 years)
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      60 min
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Children (5-12 years)
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      45 min
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Teens (12-18 years)
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      30 min
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Adults (18-40 years)
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      20 min
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Middle Age (40-65 years)
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      25 min
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Seniors (65+ years)
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      30 min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* The 30-Minute Rule */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">😴</span>
                The 30-Minute Rule
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  After 30 minutes, you enter{" "}
                  <span className="font-semibold">deep sleep</span>. Waking up
                  during this stage causes severe grogginess (sleep inertia)
                  that can last hours. To avoid this, nap for{" "}
                  <span className="font-semibold">under 30 minutes</span> or
                  complete a full{" "}
                  <span className="font-semibold">90-minute sleep cycle</span>.
                </p>
              </div>
            </div>

            {/* Tiredness Factor */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">💤</span>
                How Tiredness Affects Duration
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Slightly Tired (1-3)
                  </span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    -30% duration
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Moderately Tired (4-6)
                  </span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Base duration
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Very Tired (7-10)
                  </span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    +30% duration
                  </span>
                </div>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                <span className="text-2xl mr-3">🚀</span>
                NASA Research
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                NASA found that 26-minute power naps improved pilot performance
                by
                <span className="font-semibold"> 34%</span> and alertness by
                <span className="font-semibold"> 54%</span>. Our algorithm uses
                this and other sleep science research to optimize your rest.
              </p>
            </div>
          </div>
        </div>

        <footer className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>Recommendations based on sleep science and circadian rhythms</p>
        </footer>
      </main>
    </div>
  );
}
