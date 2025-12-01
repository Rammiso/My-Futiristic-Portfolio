import mongoose from "mongoose";
import slugify from "slugify";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      // Index defined separately below with projectSchema.index({ slug: 1 })
    },
    description: {
      type: String,
      required: [true, "Please provide a project description"],
    },
    category: {
      type: String,
      default: "Web Development",
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    technologies: [
      {
        type: String,
        required: true,
      },
    ],
    features: [
      {
        type: String,
      },
    ],
    liveUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title before saving
projectSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true, // Remove special characters
      trim: true,
    });
  }
  next();
});

// Generate slug before update
projectSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  next();
});

// Index for faster queries
projectSchema.index({ featured: -1, order: 1 });
// Note: slug index is created automatically by unique: true in the schema

const Project = mongoose.model("Project", projectSchema);

export default Project;
