export interface Activity {
  id: string;
  emoji: string;
  title: string;
  description: string;
  submittedBy: string;
  votes: {
    yes: string[];
    no: string[];
  };
  createdAt: Date;
}

export interface TripRoom {
  id: string;
  name: string;
  destination: string;
  participants: Participant[];
  activities: Activity[];
  createdAt: Date;
  createdBy: string;
}

export interface Participant {
  id: string;
  name: string;
  joinedAt: Date;
}

export interface SwipeAction {
  activityId: string;
  userId: string;
  action: "like" | "dislike";
  timestamp: Date;
}
