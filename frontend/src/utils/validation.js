// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

// Name validation
export const isValidName = (name) => {
  return name && name.trim().length >= 2;
};

// Message validation
export const isValidMessage = (message) => {
  return message && message.trim().length >= 10;
};

// Contact form validation
export const validateContactForm = (formData) => {
  const errors = {};

  if (!isValidName(formData.name)) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!isValidMessage(formData.message)) {
    errors.message = "Message must be at least 10 characters long";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Project validation (admin)
export const validateProject = (projectData) => {
  const errors = {};

  if (!projectData.title || projectData.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }

  if (!projectData.description || projectData.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters long";
  }

  if (!projectData.technologies || projectData.technologies.length === 0) {
    errors.technologies = "Please select at least one technology";
  }

  if (projectData.liveUrl && !isValidUrl(projectData.liveUrl)) {
    errors.liveUrl = "Please enter a valid URL";
  }

  if (projectData.githubUrl && !isValidUrl(projectData.githubUrl)) {
    errors.githubUrl = "Please enter a valid URL";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Blog post validation (admin)
export const validateBlogPost = (postData) => {
  const errors = {};

  if (!postData.title || postData.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }

  if (!postData.content || postData.content.trim().length < 50) {
    errors.content = "Content must be at least 50 characters long";
  }

  if (!postData.excerpt || postData.excerpt.trim().length < 20) {
    errors.excerpt = "Excerpt must be at least 20 characters long";
  }

  if (!postData.tags || postData.tags.length === 0) {
    errors.tags = "Please add at least one tag";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Sanitize HTML (basic - for displaying user content)
export const sanitizeHtml = (html) => {
  const temp = document.createElement("div");
  temp.textContent = html;
  return temp.innerHTML;
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
