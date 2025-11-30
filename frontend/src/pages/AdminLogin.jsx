import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMail, IoLockClosed, IoArrowBack } from "react-icons/io5";
import Card from "@components/ui/Card.jsx";
import Button from "@components/ui/Button.jsx";
import Input from "@components/ui/Input.jsx";
import ParticleBackground from "@components/ui/ParticleBackground.jsx";
import { FADE_IN_UP } from "@utils/constants.js";
import { useAuth } from "@hooks/useAuth.js";
import api from "@utils/api.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/admin/login", credentials);
      const { token, user } = response.data;
      login(token, user);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error || "Invalid credentials");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-darker relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-cyber opacity-80" />

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div variants={FADE_IN_UP} initial="hidden" animate="visible">
          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-neon-green transition-colors mb-8"
          >
            <IoArrowBack />
            Back to Portfolio
          </Link>

          <Card variant="glass" className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gradient mb-2">
                Admin Portal
              </h1>
              <p className="text-white/60 text-sm">
                Sign in to manage your portfolio
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <Input
                label="Email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
              />

              {/* Password */}
              <Input
                label="Password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-white/40 text-xs text-center mt-6">
              Secured with JWT authentication 🔐
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
