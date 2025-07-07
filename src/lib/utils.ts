import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Activity, TripRoom } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock data for development
export const mockActivities: Activity[] = [
  {
    id: "1",
    emoji: "🏛️",
    title: "Visit the Louvre",
    description: "Explore the world's largest art museum and see the Mona Lisa",
    submittedBy: "Alice",
    votes: { yes: [], no: [] },
    createdAt: new Date(),
  },
  {
    id: "2",
    emoji: "🗼",
    title: "Eiffel Tower at Sunset",
    description: "Take photos at the iconic Eiffel Tower during golden hour",
    submittedBy: "Bob",
    votes: { yes: [], no: [] },
    createdAt: new Date(),
  },
  {
    id: "3",
    emoji: "🥐",
    title: "French Bakery Tour",
    description: "Sample croissants and pastries at local Parisian bakeries",
    submittedBy: "Charlie",
    votes: { yes: [], no: [] },
    createdAt: new Date(),
  },
  {
    id: "4",
    emoji: "🚢",
    title: "Seine River Cruise",
    description: "Romantic boat ride along the Seine with city views",
    submittedBy: "Diana",
    votes: { yes: [], no: [] },
    createdAt: new Date(),
  },
  {
    id: "5",
    emoji: "🎨",
    title: "Montmartre Art Walk",
    description: "Explore the artistic neighborhood and see street artists",
    submittedBy: "Eve",
    votes: { yes: [], no: [] },
    createdAt: new Date(),
  },
];

export const mockTripRoom: TripRoom = {
  id: "paris-trip-2024",
  name: "Paris Adventure",
  destination: "Paris, France",
  participants: [
    { id: "1", name: "Alice", joinedAt: new Date() },
    { id: "2", name: "Bob", joinedAt: new Date() },
    { id: "3", name: "Charlie", joinedAt: new Date() },
  ],
  activities: mockActivities,
  createdAt: new Date(),
  createdBy: "Alice",
};

export function generateRoomCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
