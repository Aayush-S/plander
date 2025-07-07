"use client";

import { useState } from "react";
import { ArrowLeft, Hash, Users, Loader2 } from "lucide-react";
import Link from "next/link";

export default function JoinRoom() {
  const [formData, setFormData] = useState({
    roomCode: "",
    userName: "",
  });
  const [isJoining, setIsJoining] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoining(true);

    // Simulate joining room
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to room (for now, redirect to demo room)
    window.location.href = `/room/${formData.roomCode.toLowerCase()}`;
  };

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);
    setFormData({ ...formData, roomCode: value });
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-10 left-10 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
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
          <h1 className="text-3xl font-black ml-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Join Trip Room
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Hash className="inline w-4 h-4 mr-1" />
                  Room Code
                </label>
                <input
                  type="text"
                  value={formData.roomCode}
                  onChange={handleRoomCodeChange}
                  placeholder="Enter 6-character code"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-center text-xl font-black tracking-widest uppercase transition-all duration-200"
                  required
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Ask the trip organizer for this code
                </p>

                {/* Demo suggestion */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 text-center">
                    💡 Try the demo! Use code:{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, roomCode: "DEMO24" })
                      }
                      className="font-bold hover:underline"
                    >
                      DEMO24
                    </button>
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Users className="inline w-4 h-4 mr-1" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  placeholder="e.g., Alex"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-medium"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={formData.roomCode.length !== 6 || isJoining}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            {isJoining ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-3 w-6 h-6" />
                Joining Room...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Users className="mr-3 w-6 h-6" />
                Join Room
              </div>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">Don't have a room code?</p>
          <Link
            href="/create-room"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
          >
            Create a new room instead
          </Link>
        </div>
      </div>
    </div>
  );
}
