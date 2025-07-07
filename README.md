# Plander 🗺️

A collaborative trip planning app with Tinder-style voting for activities. Plan your perfect group trip by swiping through activity suggestions and finding what everyone loves!

## ✨ Features

- **📱 Mobile-First Design**: Beautiful, responsive interface that works perfectly on both mobile and desktop
- **🏠 Landing Page**: Welcoming homepage with clear call-to-action
- **🎯 Room System**: Create private trip rooms with shareable codes
- **➕ Activity Submission**: Easy-to-use form for suggesting activities with emoji, title, and description
- **❤️ Tinder-Style Voting**: Swipe left to pass, right to like activities
- **🎨 Modern UI**: Clean design with smooth animations and transitions
- **🔄 Real-time Progress**: Visual progress tracking through voting sessions

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS with custom animations
- **Components**: Lucide React icons
- **Animations**: Framer Motion for smooth interactions
- **State Management**: React hooks
- **Mobile Support**: Touch gestures and responsive design

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd plander
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### Creating a Trip Room

1. Click "Create Trip Room" on the homepage
2. Fill in trip details (name, destination, dates)
3. Get your shareable room code
4. Share the code with your travel companions

### Joining a Room

1. Click "Join Existing Room" on the homepage
2. Enter the 6-character room code
3. Add your name to join the group

### Adding Activities

1. In your trip room, click "Suggest Activity"
2. Choose an emoji that represents the activity
3. Add a catchy title and description
4. Submit to add it to the voting pool

### Voting on Activities

1. Swipe right (👍) to like an activity
2. Swipe left (👎) to pass on an activity
3. Or use the heart/X buttons below the card
4. See your progress as you vote through all suggestions

## 📁 Project Structure

```
plander/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   │   ├── create-room/        # Room creation flow
│   │   ├── join-room/          # Room joining flow
│   │   ├── room/[id]/          # Dynamic room pages
│   │   │   ├── add-activity/   # Activity submission
│   │   │   └── page.tsx        # Main room with voting
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable components
│   │   └── SwipeCard.tsx       # Tinder-style card component
│   ├── lib/                    # Utilities and mock data
│   │   └── utils.ts            # Helper functions
│   └── types/                  # TypeScript type definitions
│       └── index.ts            # App-wide types
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # TailwindCSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Design Decisions

### Color Scheme

- **Primary**: Blue gradient (`primary-*` classes)
- **Accent**: Red for actions (`accent-*` classes)
- **Success**: Green for positive actions
- **Neutral**: Gray tones for text and backgrounds

### Animations

- **Swipe animations**: Smooth card transitions with rotation
- **Fade-in effects**: Gentle entrance animations
- **Bounce effects**: Playful feedback for interactions
- **Progress animations**: Visual feedback for user actions

### Mobile Optimization

- **Touch-first**: Designed for touch interactions
- **Safe areas**: Proper handling of device safe areas
- **Responsive breakpoints**: Adapts to all screen sizes
- **Gesture support**: Natural swipe gestures

## 🔄 Future Enhancements

This frontend-focused version is ready for backend integration:

- **Real-time updates**: WebSocket connections for live voting
- **User authentication**: Secure user accounts
- **Database integration**: Persistent data storage
- **Results dashboard**: See voting results and popular activities
- **Chat system**: In-room messaging
- **Photo uploads**: Add images to activity suggestions
- **Location services**: GPS-based activity suggestions
- **Push notifications**: Room updates and reminders

## 🧪 Development

### Mock Data

The app includes realistic mock data for development:

- Sample Paris trip with 5 activities
- Multiple participants
- Varied activity suggestions with emojis

### Local Development

- Hot reloading enabled
- TypeScript strict mode
- ESLint configuration
- Responsive design testing

### Build Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # Run ESLint
```

## 📱 Screenshots

_Note: Add screenshots here once the app is running_

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile and desktop
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ for better trip planning experiences
