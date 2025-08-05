import { Footer } from "@/components/atoms/Footer/Footer";
import { Navbar } from "@/components/atoms/Navbar/Navbar";
import { useAuth } from "@/hooks/context/useAuth";
import {
  ArrowRight,
  CheckCircle,
  Hash,
  MessageSquare,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: MessageSquare,
    title: "Real-time Messaging",
    description:
      "Instant message delivery with rich text formatting and media sharing capabilities.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Create workspaces and organize teams with seamless member management.",
  },
  {
    icon: Hash,
    title: "Channel Organization",
    description:
      "Organize conversations by topics with dedicated channels for better workflow.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Enterprise-grade security with private channels and user authentication.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with modern technologies for optimal performance and reliability.",
  },
  {
    icon: Star,
    title: "Professional UI",
    description:
      "Clean, intuitive interface designed for productivity and user experience.",
  },
];

const techStack = [
  "React.js",
  "Node.js",
  "Socket.io",
  "MongoDB",
  "Express.js",
  "Tailwind CSS",
];

export const Landing = () => {
  const { auth } = useAuth();
  const { user } = auth;
  console.log("auth", auth);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-theme-light/5">
      <Navbar user={user} />

      <main className="flex flex-col items-center justify-center px-6 lg:px-12 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-theme-dark via-theme-indigo to-theme-medium bg-clip-text text-transparent leading-tight">
            Modern Team
            <br />
            Communication
          </h1>

          <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A professional chat application built with modern technologies.
            Perfect for team collaboration, project management, and seamless
            communication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            {!user ? (
              <>
                <Link
                  to="/auth/signup"
                  className="bg-gradient-to-r from-theme-indigo to-theme-medium text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/auth/signin"
                  className="border-2 border-theme-dark text-theme-dark px-8 py-4 rounded-xl font-semibold text-lg hover:bg-theme-dark hover:text-white transition-all duration-200 transform hover:scale-105"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/app"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                Continue to App
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </main>

      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Built for Modern Teams
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need for effective team communication and
              collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200/50"
              >
                <div className="p-4 bg-gradient-to-br from-theme-light/20 to-theme-indigo/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-theme-indigo" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-slate-100 via-white to-theme-light/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Built with Modern Technologies
          </h2>
          <p className="text-lg text-slate-600 mb-12">
            Leveraging the latest web technologies for optimal performance and
            developer experience
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200/50"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-theme-indigo to-theme-medium rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-slate-900">{tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
