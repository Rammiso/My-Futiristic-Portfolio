import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a post title"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, "Please provide an excerpt"],
    },
    content: {
      type: String,
      required: [true, "Please provide post content"],
    },
    featuredImage: {
      type: String,
      default: "",
    },
    tags: [
      {
        type: String,
        lowercase: true,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
    readTime: {
      type: Number, // in minutes
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title before saving
blogPostSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  }
  next();
});

// Calculate read time based on content length
blogPostSchema.pre("save", function (next) {
  if (this.isModified("content")) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

// Index for faster queries
blogPostSchema.index({ published: -1, createdAt: -1 });
blogPostSchema.index({ tags: 1 });

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
