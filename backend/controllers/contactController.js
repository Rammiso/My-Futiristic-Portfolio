import Contact from "../models/Contact.js";
import sendEmail from "../config/email.js";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public (with rate limiting)
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
      });
    }

    // Get IP address
    const ip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress || "";

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      subject: subject || "",
      message,
      ip,
    });

    // Send email notification to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

      await sendEmail({
        to: adminEmail,
        subject: `New Contact: ${subject || "No Subject"} - from ${name}`,
        text: `
You have a new contact form submission:

Name: ${name}
Email: ${email}
Subject: ${subject || "No Subject"}

Message:
${message}

---
Submitted at: ${new Date().toLocaleString()}
IP Address: ${ip}
        `,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #667eea; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin:0;">💌 New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${name}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
      </div>
      <div class="field">
        <span class="label">Subject:</span> ${subject || "No Subject"}
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
      </div>
      <div class="footer">
        Submitted at: ${new Date().toLocaleString()}<br>
        IP Address: ${ip}
      </div>
    </div>
  </div>
</body>
</html>
        `,
      });
      console.log(`✉️ Contact form notification sent to ${adminEmail}`);
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/admin/contacts
// @access  Private (Admin)
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark contact as read
// @route   PATCH /api/admin/contacts/:id
// @access  Private (Admin)
export const markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/admin/contacts/:id
// @access  Private (Admin)
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export default { submitContact, getContacts, markAsRead, deleteContact };
