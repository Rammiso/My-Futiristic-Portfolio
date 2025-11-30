import { useState, useEffect } from "react";
import { IoAdd, IoCreate, IoTrash } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "@components/ui/Card.jsx";
import Button from "@components/ui/Button.jsx";
import Input from "@components/ui/Input.jsx";
import Modal from "@components/ui/Modal.jsx";
import Loader from "@components/ui/Loader.jsx";
import api from "@utils/api.js";
import toast from "react-hot-toast";
import { formatDate } from "@utils/validation.js";

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    tags: "",
    published: true,
  });

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
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage || "",
        tags: post.tags?.join(", ") || "",
        published: post.published !== false,
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        tags: "",
        published: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingPost) {
        await api.put(`/admin/posts/${editingPost._id}`, postData);
        toast.success("Post updated successfully!");
      } else {
        await api.post("/admin/posts", postData);
        toast.success("Post created successfully!");
      }
      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      toast.error(error || "Failed to save post");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/admin/posts/${id}`);
      toast.success("Post deleted successfully!");
      fetchPosts();
    } catch (error) {
      toast.error(error || "Failed to delete post");
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["link", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Loading blog posts..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Manage Blog Posts</h2>
          <p className="text-white/60 text-sm mt-1">
            Create and manage your blog content
          </p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <IoAdd className="inline mr-2" />
          New Post
        </Button>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <Card variant="glass" className="p-12 text-center">
          <p className="text-white/50 mb-4">No blog posts yet</p>
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Write Your First Post
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post._id} variant="glass" className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/40 text-xs">
                    {formatDate(post.createdAt)} •{" "}
                    {post.published ? "✓ Published" : "✗ Draft"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenModal(post)}
                  >
                    <IoCreate />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post._id)}
                  >
                    <IoTrash />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Post Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? "Edit Post" : "New Post"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="My Awesome Blog Post"
            required
          />
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={3}
              className="cyber-input w-full resize-none"
              placeholder="Brief summary of your post..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Content
            </label>
            <div className="bg-white rounded-lg">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
                modules={quillModules}
                className="min-h-[300px]"
              />
            </div>
          </div>
          <Input
            label="Featured Image URL"
            value={formData.featuredImage}
            onChange={(e) =>
              setFormData({ ...formData, featuredImage: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
          />
          <Input
            label="Tags (comma-separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="JavaScript, React, Web Development"
            required
          />
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-4 h-4 rounded border-white/20 bg-cyber-card text-neon-green focus:ring-neon-green"
            />
            <label htmlFor="published" className="text-white/80 text-sm">
              Publish immediately
            </label>
          </div>
          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              {editingPost ? "Update Post" : "Create Post"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BlogManager;
