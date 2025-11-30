import { useState, useEffect } from "react";
import {
  IoAdd,
  IoCreate,
  IoTrash,
  IoGlobe,
  IoLogoGithub,
} from "react-icons/io5";
import Card from "@components/ui/Card.jsx";
import Button from "@components/ui/Button.jsx";
import Input from "@components/ui/Input.jsx";
import Modal from "@components/ui/Modal.jsx";
import Loader from "@components/ui/Loader.jsx";
import api from "@utils/api.js";
import toast from "react-hot-toast";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    features: "",
    liveUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get("/projects");
      setProjects(response.data.data || []);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image || "",
        technologies: project.technologies?.join(", ") || "",
        features: project.features?.join("\n") || "",
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        image: "",
        technologies: "",
        features: "",
        liveUrl: "",
        githubUrl: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      features: formData.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, projectData);
        toast.success("Project updated successfully!");
      } else {
        await api.post("/projects", projectData);
        toast.success("Project created successfully!");
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      toast.error(error || "Failed to save project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      toast.error(error || "Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Loading projects..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
          <p className="text-white/60 text-sm mt-1">
            Create and manage your portfolio projects
          </p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <IoAdd className="inline mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <Card variant="glass" className="p-12 text-center">
          <p className="text-white/50 mb-4">No projects yet</p>
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Create Your First Project
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project._id}
              variant="glass"
              className="p-0 overflow-hidden"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenModal(project)}
                  >
                    <IoCreate className="inline mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(project._id)}
                  >
                    <IoTrash className="inline mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Project Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Edit Project" : "Create Project"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="My Awesome Project"
            required
          />
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="cyber-input w-full resize-none"
              placeholder="Describe your project..."
              required
            />
          </div>
          <Input
            label="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
          />
          <Input
            label="Technologies (comma-separated)"
            value={formData.technologies}
            onChange={(e) =>
              setFormData({ ...formData, technologies: e.target.value })
            }
            placeholder="React, Node.js, MongoDB"
            required
          />
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Key Features (one per line)
            </label>
            <textarea
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              rows={4}
              className="cyber-input w-full resize-none"
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            />
          </div>
          <Input
            label="Live Demo URL"
            value={formData.liveUrl}
            onChange={(e) =>
              setFormData({ ...formData, liveUrl: e.target.value })
            }
            placeholder="https://demo.example.com"
          />
          <Input
            label="GitHub URL"
            value={formData.githubUrl}
            onChange={(e) =>
              setFormData({ ...formData, githubUrl: e.target.value })
            }
            placeholder="https://github.com/username/repo"
          />
          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              {editingProject ? "Update Project" : "Create Project"}
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

export default ProjectManager;
