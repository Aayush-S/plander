import { ArrowRight, Users, Map, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <div className="text-7xl md:text-9xl mb-6 animate-bounce-in">
              🗺️
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Your Perfect Trip
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
              Swipe, vote, and discover amazing activities together with your
              travel companions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/create-room"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="relative z-10 flex items-center">
                <Sparkles className="mr-3 w-6 h-6" />
                Create Trip Room
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/join-room"
              className="group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 font-bold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="flex items-center">
                <Users className="mr-3 w-6 h-6" />
                Join Existing Room
              </div>
            </Link>

            {/* Test Room Quick Access */}
            <Link
              href="/room/paris-trip-2024"
              className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="flex items-center">
                <Heart className="mr-3 w-6 h-6" />
                Try Demo Room
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-4 py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Create & Share
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Start a trip room and invite your friends to join the planning
                adventure
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2">
                  <Map className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Submit Ideas
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Everyone can suggest activities, restaurants, and amazing
                attractions
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-green-500/50 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Swipe & Vote
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Swipe through ideas Tinder-style to discover activities everyone
                loves
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
