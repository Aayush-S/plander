"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const popularEmojis = [
  "🏛️",
  "🗼",
  "🎨",
  "🍕",
  "🥐",
  "🍷",
  "🚢",
  "🏖️",
  "🎭",
  "🎪",
  "🎯",
  "🎳",
  "🎸",
  "🎺",
  "🖼️",
  "🏰",
  "🏯",
  "🗿",
  "🎡",
  "🎢",
  "🎠",
  "🎊",
  "🎉",
  "🎈",
  "🎁",
  "🎂",
  "🍰",
  "🍜",
  "🍱",
  "🏔️",
  "🌊",
  "🌅",
  "🌇",
  "🚁",
  "🛶",
  "🏄",
];

export default function AddActivity() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;

  const [formData, setFormData] = useState({
    emoji: "",
    title: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate activity submission
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    const roomCode = params.code as string;

    const response = await fetch(`/activities/${roomCode}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to add activity");
    }

    const data = await response.json();

    console.log("Adding activity:", data);

    // Redirect back to room
    router.push(`/room/${roomCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 px-4 py-8 safe-top">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link
              href={`/room/${roomId}`}
              className="p-3 -ml-3 rounded-full hover:bg-white/50 backdrop-blur-sm transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-black ml-4 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              Add Activity
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
              <div className="space-y-6">
                {/* Emoji Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">
                    Choose an emoji to represent your activity
                  </label>
                  <div className="grid grid-cols-6 gap-3">
                    {popularEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setFormData({ ...formData, emoji })}
                        className={`p-3 rounded-xl text-2xl transition-all duration-200 ${
                          formData.emoji === emoji
                            ? "bg-gradient-to-r from-rose-100 to-orange-100 ring-2 ring-rose-400 scale-110 shadow-lg"
                            : "bg-gray-50 hover:bg-gray-100 hover:scale-105"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  {formData.emoji && (
                    <div className="mt-6 text-center bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-4 border border-rose-200">
                      <div className="text-5xl mb-2 animate-bounce-in">
                        {formData.emoji}
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Perfect choice!
                      </p>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Activity Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Visit the Louvre Museum"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 font-medium"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Why should your group do this?
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe what makes this activity special and why your group would love it..."
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 resize-none transition-all duration-200 font-medium"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.description.length}/200 characters
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={
                !formData.emoji ||
                !formData.title.trim() ||
                !formData.description.trim() ||
                isSubmitting
              }
              className="w-full bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-rose-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:hover:scale-100 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Adding Activity...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="mr-3 w-6 h-6" />
                  Add to Trip Plan
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-sm text-gray-600 leading-relaxed">
              💡 <strong>Pro tip:</strong> The more exciting your description,
              the more likely your group will want to do it!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
