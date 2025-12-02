import { motion } from "framer-motion";
import { useState } from "react";
import { IoSparkles, IoImage, IoSend } from "react-icons/io5";
import Card from "@components/ui/Card.jsx";
import Button from "@components/ui/Button.jsx";
import Input from "@components/ui/Input.jsx";
import Loader from "@components/ui/Loader.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";
import api from "@utils/api.js";
import toast from "react-hot-toast";

const AIPlayground = () => {
  const [activeDemo, setActiveDemo] = useState("text");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      setLoading(true);

      // Use different endpoints for text vs image
      const endpoint =
        activeDemo === "text" ? "/ai-playground/text" : "/ai-playground/image";

      const response = await api.post(endpoint, {
        prompt: input,
      });

      // Handle different response formats
      if (activeDemo === "text") {
        setOutput(response.data.data.generatedText);
      } else {
        // For image, store the base64 data URI
        setOutput(response.data.data.image);
      }

      toast.success(
        activeDemo === "text"
          ? "Text generated successfully!"
          : "Image generated successfully!"
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate AI response";
      toast.error(errorMessage);
      console.error("AI Playground error:", error);
    } finally {
      setLoading(false);
    }
  };

  const demos = [
    {
      id: "text",
      name: "Text Generation",
      icon: <IoSparkles />,
      placeholder:
        'Enter your prompt... (e.g., "Write a short poem about technology")',
      description: "Generate creative text using AI",
    },
    {
      id: "image",
      name: "Image Generation",
      icon: <IoImage />,
      placeholder:
        'Describe an image... (e.g., "A futuristic city with neon lights")',
      description: "Generate AI images using Stable Diffusion",
    },
  ];

  const activeTab = demos.find((d) => d.id === activeDemo);

  return (
    <section
      id="ai-playground"
      className="section-padding bg-cyber-darker relative"
    >
      <div className="container-custom">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.h2
            variants={FADE_IN_UP}
            className="section-title text-center"
          >
            AI Playground
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP}
            className="text-white/60 text-center mb-12 max-w-2xl mx-auto"
          >
            Explore the power of AI with interactive demos
          </motion.p>

          {/* Demo Tabs */}
          <motion.div variants={FADE_IN_UP} className="max-w-4xl mx-auto">
            <div className="flex gap-4 mb-8 justify-center flex-wrap">
              {demos.map((demo) => (
                <Button
                  key={demo.id}
                  variant={activeDemo === demo.id ? "solid" : "outline"}
                  onClick={() => {
                    setActiveDemo(demo.id);
                    setInput("");
                    setOutput("");
                  }}
                  className="flex items-center gap-2"
                >
                  {demo.icon}
                  {demo.name}
                </Button>
              ))}
            </div>

            {/* Demo Area */}
            <Card variant="glass" className="p-8">
              <p className="text-white/70 text-sm mb-6">
                {activeTab.description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Your Prompt
                  </label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={activeTab.placeholder}
                    rows={4}
                    className="cyber-input w-full resize-none"
                    disabled={loading}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || !input.trim()}
                  className="w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader size="sm" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <IoSend className="inline mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </form>

              {/* Output */}
              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 rounded-lg bg-cyber-card/50 border border-neon-green/30"
                >
                  <h4 className="text-lg font-semibold text-neon-green mb-3">
                    {activeDemo === "text"
                      ? "Generated Text"
                      : "Generated Image"}
                  </h4>

                  {activeDemo === "text" ? (
                    <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                      {output}
                    </p>
                  ) : (
                    <div className="flex justify-center">
                      <img
                        src={output}
                        alt="AI Generated"
                        className="max-w-full h-auto rounded-lg border border-neon-green/20 shadow-lg"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Disclaimer */}
              <p className="text-white/40 text-xs mt-6 text-center italic">
                ⚠️ This is a demo feature. AI responses may vary in quality and
                accuracy.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIPlayground;
