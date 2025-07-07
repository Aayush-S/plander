"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, Users, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { generateRoomCode } from "@/lib/utils";

export default function CreateRoom() {
  const [formData, setFormData] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    creatorName: "",
    tripAdvisorSuggestions: false,
  });

  const [isCreating, setIsCreating] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Simulate room creation
    const newRoomCode = generateRoomCode();
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

    setRoomCode(newRoomCode);
    setIsCreating(false);
  };

  if (roomCode) {
    return (
      <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-md mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce-in">🎉</div>
            <h1 className="text-3xl font-black text-gray-900 mb-4">
              Room Created!
            </h1>
            <p className="text-gray-600">
              Share this code with your travel companions
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mb-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-3">
                Your room code is:
              </p>
              <div className="text-4xl font-black tracking-widest text-blue-600 bg-blue-50 py-4 px-6 rounded-xl border-2 border-blue-200 mb-4">
                {roomCode}
              </div>
              <p className="text-sm text-gray-500">
                Tell your friends to enter this code when joining
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href={`/room/${roomCode.toLowerCase()}`}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 text-center"
            >
              Go to Your Room
            </Link>
            <Link
              href="/"
              className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 font-bold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 shadow-xl transition-all duration-300 text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="p-3 -ml-3 rounded-full hover:bg-white/50 backdrop-blur-sm transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-black ml-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Trip Room
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Trip Name
                </label>
                <input
                  type="text"
                  value={formData.tripName}
                  onChange={(e) =>
                    setFormData({ ...formData, tripName: e.target.value })
                  }
                  placeholder="e.g., Paris Adventure 2024"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  placeholder="e.g., Paris, France"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Users className="inline w-4 h-4 mr-1" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.creatorName}
                  onChange={(e) =>
                    setFormData({ ...formData, creatorName: e.target.value })
                  }
                  placeholder="e.g., Alex"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                  required
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <label className="block text-sm font-bold text-gray-700 mb-0 flex items-center">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  TripAdvisor Suggestions
                </label>
                <button
                  type="button"
                  aria-pressed={formData.tripAdvisorSuggestions}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tripAdvisorSuggestions: !formData.tripAdvisorSuggestions,
                    })
                  }
                  className={`relative inline-flex h-7 w-14 border-2 border-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formData.tripAdvisorSuggestions
                      ? "bg-blue-500 border-blue-500"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                      formData.tripAdvisorSuggestions
                        ? "translate-x-7"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            {isCreating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Creating Room...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Sparkles className="mr-3 w-6 h-6" />
                Create Room & Get Code
              </div>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            After creating, you'll get a unique room code to share with your
            friends
          </p>
        </div>
      </div>
    </div>
  );
}
