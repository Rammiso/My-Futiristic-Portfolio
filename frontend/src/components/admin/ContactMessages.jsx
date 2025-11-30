import { useState, useEffect } from "react";
import { IoMail, IoCall, IoTrash, IoCheckmark } from "react-icons/io5";
import Card from "@components/ui/Card.jsx";
import Button from "@components/ui/Button.jsx";
import Loader from "@components/ui/Loader.jsx";
import api from "@utils/api.js";
import toast from "react-hot-toast";
import { formatDate } from "@utils/validation.js";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contact");
      setMessages(response.data.data || []);
    } catch (error) {
      toast.error("Failed to load messages");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/contact/${id}`, { read: true });
      toast.success("Marked as read");
      fetchMessages();
    } catch (error) {
      toast.error(error || "Failed to update message");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      await api.delete(`/contact/${id}`);
      toast.success("Message deleted successfully!");
      fetchMessages();
    } catch (error) {
      toast.error(error || "Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Loading messages..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
        <p className="text-white/60 text-sm mt-1">
          View and manage messages from your contact form ({messages.length}{" "}
          total)
        </p>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <Card variant="glass" className="p-12 text-center">
          <p className="text-white/50">No messages yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message._id}
              variant="glass"
              className={`p-6 ${!message.read ? "border-neon-green/50" : ""}`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {message.name}
                    </h3>
                    {!message.read && (
                      <span className="px-2 py-1 text-xs rounded-full bg-neon-green/20 border border-neon-green/50 text-neon-green">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-white/60 mb-3">
                    <a
                      href={`mailto:${message.email}`}
                      className="flex items-center gap-2 hover:text-neon-green transition-colors"
                    >
                      <IoMail />
                      {message.email}
                    </a>
                    {message.phone && (
                      <a
                        href={`tel:${message.phone}`}
                        className="flex items-center gap-2 hover:text-neon-green transition-colors"
                      >
                        <IoCall />
                        {message.phone}
                      </a>
                    )}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-3">
                    {message.message}
                  </p>
                  <p className="text-white/40 text-xs">
                    Received: {formatDate(message.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!message.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsRead(message._id)}
                      title="Mark as read"
                    >
                      <IoCheckmark />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(message._id)}
                    title="Delete"
                  >
                    <IoTrash />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
