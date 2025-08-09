import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = ({ user }) => {
  return (
    <nav className="flex items-center justify-between px-6 lg:px-12 py-6">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-theme-indigo to-theme-medium rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-theme-dark to-theme-indigo bg-clip-text text-transparent">
          ChatHive
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link
              to="/auth/signin"
              className="text-theme-dark font-medium hover:text-theme-indigo transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth/signup"
              className="bg-gradient-to-r from-theme-indigo to-theme-medium text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </Link>
          </>
        ) : (
          <Link
            to="/home"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Go to App
          </Link>
        )}
      </div>
    </nav>
  );
};
