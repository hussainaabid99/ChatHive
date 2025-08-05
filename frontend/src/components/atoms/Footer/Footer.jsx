import { MessageSquare } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-slate-200/50">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-theme-indigo to-theme-medium rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">ChatApp</span>
        </div>
        <p className="text-slate-600 mb-4">
          Modern team communication platform built with React, Node.js, and
          Socket.io
        </p>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} ChatApp. Built for portfolio showcase.
        </p>
      </div>
    </footer>
  );
};
