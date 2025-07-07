"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { Heart, X, User } from "lucide-react";
import { Activity } from "@/types";

interface SwipeCardProps {
  activity: Activity;
  onSwipe: (activityId: string, direction: "left" | "right") => void;
  isVisible: boolean;
}

export default function SwipeCard({
  activity,
  onSwipe,
  isVisible,
}: SwipeCardProps) {
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null
  );
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(
    null
  );
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset component state when activity changes
  useEffect(() => {
    setExitDirection(null);
    setDragDirection(null);
    controls.set({
      x: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
    });
  }, [activity.id, controls]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);
    const offset = info.offset.x;

    if (offset > threshold || (velocity > 300 && offset > 50)) {
      // Swipe right (like)
      setExitDirection("right");
      controls.start({
        x: 1000,
        rotate: 30,
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.3, ease: "easeInOut" },
      });
      setTimeout(() => onSwipe(activity.id, "right"), 300);
    } else if (offset < -threshold || (velocity > 300 && offset < -50)) {
      // Swipe left (dislike)
      setExitDirection("left");
      controls.start({
        x: -1000,
        rotate: -30,
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.3, ease: "easeInOut" },
      });
      setTimeout(() => onSwipe(activity.id, "left"), 300);
    } else {
      // Snap back to center
      setDragDirection(null);
      controls.start({
        x: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      });
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    const offset = info.offset.x;
    if (offset > 50) {
      setDragDirection("right");
    } else if (offset < -50) {
      setDragDirection("left");
    } else {
      setDragDirection(null);
    }
  };

  const handleButtonClick = (direction: "left" | "right") => {
    setExitDirection(direction);
    const x = direction === "right" ? 1000 : -1000;
    const rotate = direction === "right" ? 30 : -30;

    controls.start({
      x,
      rotate,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeInOut" },
    });
    setTimeout(() => onSwipe(activity.id, direction), 300);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 w-full max-w-sm mx-auto cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      whileDrag={{
        scale: 1.05,
        rotate:
          dragDirection === "right" ? 5 : dragDirection === "left" ? -5 : 0,
      }}
      style={{ zIndex: isVisible ? 20 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl h-full flex flex-col relative overflow-hidden shadow-2xl border border-white/20">
        {/* Swipe indicators */}
        <div className="absolute top-6 left-6 right-6 flex justify-between pointer-events-none z-10">
          <motion.div
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
            initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
            animate={{
              opacity: dragDirection === "left" ? 1 : 0,
              scale: dragDirection === "left" ? 1 : 0.8,
              rotate: -12,
            }}
            transition={{ duration: 0.2 }}
          >
            PASS
          </motion.div>
          <motion.div
            className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
            initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
            animate={{
              opacity: dragDirection === "right" ? 1 : 0,
              scale: dragDirection === "right" ? 1 : 0.8,
              rotate: 12,
            }}
            transition={{ duration: 0.2 }}
          >
            LIKE
          </motion.div>
        </div>

        {/* Activity content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
          <div className="text-8xl mb-6 animate-bounce-in">
            {activity.emoji}
          </div>
          <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight">
            {activity.title}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-xs">
            {activity.description}
          </p>

          {/* Submitted by */}
          <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
            <User className="w-4 h-4 mr-1" />
            Suggested by {activity.submittedBy}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-8 pb-8">
          <motion.button
            onClick={() => handleButtonClick("left")}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 flex items-center justify-center transition-all duration-200 shadow-xl hover:shadow-red-500/25"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-8 h-8 text-white" />
          </motion.button>
          <motion.button
            onClick={() => handleButtonClick("right")}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 flex items-center justify-center transition-all duration-200 shadow-xl hover:shadow-green-500/25"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
