"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Users,
  MapPin,
  Settings,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import SwipeCard from "@/components/SwipeCard";
import { mockTripRoom, mockActivities } from "@/lib/utils";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activities, setActivities] = useState(mockActivities);
  const room = mockTripRoom;

  const handleSwipe = (activityId: string, direction: "left" | "right") => {
    console.log(`Swiped ${direction} on activity ${activityId}`);

    // Move to next card
    setCurrentIndex((prev) => prev + 1);

    // TODO: Record vote in backend
    // For now, just log it
    const activity = activities.find((a) => a.id === activityId);
    if (activity) {
      console.log(
        `Voted ${direction === "right" ? "yes" : "no"} on: ${activity.title}`
      );
    }
  };

  const currentActivity = activities[currentIndex];
  const nextActivity = activities[currentIndex + 1];
  const hasActivities = currentIndex < activities.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 px-4 py-8 safe-top">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="p-3 -ml-3 rounded-full hover:bg-white/50 backdrop-blur-sm transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex-1 ml-4">
              <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {room.name}
              </h1>
              <div className="flex items-center text-sm text-gray-600 font-medium">
                <MapPin className="w-4 h-4 mr-1" />
                {room.destination}
              </div>
            </div>
            <button className="p-3 rounded-full hover:bg-white/50 backdrop-blur-sm transition-all duration-200">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          {/* Room Info Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    {room.participants.length} members
                  </span>
                  <p className="text-sm text-gray-500">Planning together</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {activities.length - currentIndex}
                </div>
                <p className="text-sm text-gray-500">activities left</p>
              </div>
            </div>

            {/* Participants */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 mr-2">
                Members:
              </span>
              <div className="flex -space-x-2">
                {room.participants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white"
                  >
                    {participant.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Swipe Cards Container */}
          <div className="relative h-[500px] mb-6">
            {hasActivities ? (
              <>
                {/* Next card (behind) */}
                {nextActivity && (
                  <div className="absolute inset-0 w-full max-w-sm mx-auto">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl h-full flex flex-col justify-center items-center text-center p-6 opacity-50 scale-95 shadow-xl border border-white/20">
                      <div className="text-6xl mb-4">{nextActivity.emoji}</div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {nextActivity.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {nextActivity.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Current card (front) */}
                <SwipeCard
                  key={currentActivity.id}
                  activity={currentActivity}
                  onSwipe={handleSwipe}
                  isVisible={true}
                />
              </>
            ) : (
              // No more activities
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl h-full flex flex-col justify-center items-center text-center p-6 shadow-2xl border border-white/20">
                <div className="text-7xl mb-6 animate-bounce-in">🎉</div>
                <h3 className="text-3xl font-black mb-4 text-gray-900 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  All done!
                </h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  You've voted on all activities. Check back later for results
                  or add more ideas!
                </p>
                <Link
                  href={`/room/${roomId}/add-activity`}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2 inline" />
                  Add More Activities
                </Link>
              </div>
            )}
          </div>

          {/* Instructions */}
          {hasActivities && (
            <div className="text-center mb-6 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-gray-700 font-medium mb-1">
                Swipe right to like ❤️, left to pass ✋
              </p>
              <p className="text-sm text-gray-500">
                Or use the buttons below the card
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <Link
              href={`/room/${roomId}/add-activity`}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 text-center"
            >
              <Plus className="w-5 h-5 mr-2 inline" />
              Suggest Activity
            </Link>
          </div>

          {/* Progress indicator */}
          {hasActivities && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                <span>Voting Progress</span>
                <span>
                  {currentIndex + 1} / {activities.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentIndex + 1) / activities.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
