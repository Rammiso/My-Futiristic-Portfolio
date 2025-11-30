import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    phone: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    ip: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
contactSchema.index({ read: 1, createdAt: -1 });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
