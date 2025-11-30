import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoLogOut, IoChatbubbles, IoGrid } from "react-icons/io5";
import AdminLayout from "@components/admin/AdminLayout.jsx";
import ProjectManager from "@components/admin/ProjectManager.jsx";
import ContactMessages from "@components/admin/ContactMessages.jsx";
import Button from "@components/ui/Button.jsx";
import Loader from "@components/ui/Loader.jsx";
import { useAuth } from "@hooks/useAuth.js";
import { FADE_IN_UP } from "@utils/constants.js";

const AdminDashboard = () => {
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-darker">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: "projects", label: "Projects", icon: <IoGrid /> },
    { id: "contacts", label: "Messages", icon: <IoChatbubbles /> },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-cyber-darker">
        {/* Header */}
        <div className="bg-cyber-dark border-b border-white/10 sticky top-0 z-30">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gradient">
                  Admin Dashboard
                </h1>
                <p className="text-white/60 text-sm mt-1">
                  Welcome back, {user?.name || "Admin"}!
                </p>
              </div>
              <Button variant="outline" onClick={logout}>
                <IoLogOut className="inline mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 bg-cyber-card/30">
          <div className="container-custom">
            <div className="flex gap-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-neon-green text-neon-green"
                      : "border-transparent text-white/60 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-8">
          <motion.div
            key={activeTab}
            variants={FADE_IN_UP}
            initial="hidden"
            animate="visible"
          >
            {activeTab === "projects" && <ProjectManager />}
            {activeTab === "contacts" && <ContactMessages />}
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
