import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoCalendar, IoTime, IoArrowForward } from "react-icons/io5";
import Card from "@components/ui/Card.jsx";
import Loader from "@components/ui/Loader.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";
import { formatDate, truncateText } from "@utils/validation.js";
import api from "@utils/api.js";
import toast from "react-hot-toast";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/posts");
      setPosts(response.data.data || []);
    } catch (error) {
      toast.error("Failed to load blog posts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="blog" className="section-padding bg-cyber-dark relative">
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
            Blog & Insights
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP}
            className="text-white/60 text-center mb-12 max-w-2xl mx-auto"
          >
            Thoughts on development, technology, and innovation
          </motion.p>

          {/* Blog Posts */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader size="lg" text="Loading posts..." />
            </div>
          ) : posts.length === 0 ? (
            <motion.div variants={FADE_IN_UP} className="text-center py-20">
              <p className="text-white/50 text-lg">
                No blog posts available yet.
              </p>
              <p className="text-white/30 text-sm mt-2">
                Stay tuned for insights and articles!
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={STAGGER_CONTAINER}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post) => (
                <motion.div key={post._id} variants={FADE_IN_UP}>
                  <Card
                    variant="glass"
                    className="p-0 overflow-hidden h-full flex flex-col group cursor-pointer"
                  >
                    {/* Featured Image */}
                    {post.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                        <span className="flex items-center gap-1">
                          <IoCalendar />
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <IoTime />
                          {post.readTime || "5"} min read
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-white/60 text-sm mb-4 flex-1 line-clamp-3">
                        {post.excerpt || truncateText(post.content, 150)}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-neon-green group-hover:gap-4 transition-all">
                        <span className="text-sm font-semibold">Read More</span>
                        <IoArrowForward />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
