require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { generateEmailHtml } = require('./emailTemplate');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the current directory
// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Configuration (Cloudinary)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Determine resource type based on file mimetype
        let resourceType = 'auto'; // Default to auto
        
        // Force 'raw' for documents to ensure they are downloadable and not treated as images
        if (file.mimetype === 'application/pdf' || 
            file.mimetype.includes('word') || 
            file.mimetype.includes('document')) {
            resourceType = 'raw';
        }

        return {
            folder: 'portfolio_uploads',
            resource_type: resourceType,
            // Keep original filename (sanitized) + timestamp
            public_id: file.originalname.replace(/[^a-zA-Z0-9]/g, '_') + '_' + Date.now(),
            // Remove allowed_formats here as 'raw' doesn't support it the same way,
            // validation can happen via file filter if crucial, but this is sufficient.
        };
    },
});

const upload = multer({ storage: storage });

// Email Transporter Setup
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT == 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Admin Email
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

// Agency Details for Template
const AGENCY_DETAILS = {
    agencyName: process.env.AGENCY_NAME || 'My Agency',
    agencyWebsite: process.env.AGENCY_WEBSITE || 'https://example.com',
    agencyPhone: process.env.AGENCY_PHONE || '',
    agencyEmail: process.env.AGENCY_EMAIL || 'support@example.com',
};

// API Endpoint to Handle Form Submission
// Use upload.array('referenceFiles') to handle multiple files
app.post('/api/send-project-request', upload.array('referenceFiles'), async (req, res) => {
    try {
        const formData = req.body;
        const files = req.files || [];

        console.log('Received form submission:', formData);
        console.log('Received files:', files.length);

        // Process file URLs
        const fileLinks = files.map(file => file.path).join(', ');
        
        // Prepare data for the email template
        const emailData = {
            ...formData,
            referenceFiles: fileLinks || 'None', // Overwrite the 'None' text with actual links
            submissionDate: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            ...AGENCY_DETAILS
        };

        const emailHtml = generateEmailHtml(emailData);

        // Email Options
        const mailOptions = {
            from: `"${AGENCY_DETAILS.agencyName}" <${process.env.SMTP_USER}>`,
            to: formData.clientEmail, // Send to Client
            cc: ADMIN_EMAIL,          // Send copy to Admin
            subject: `Project Request Confirmation – ${formData.projectName}`,
            html: emailHtml,
            // Optional: attach files directly as attachments if preferred, but links are safer for size
            // attachments: files.map(f => ({ path: f.path })) 
        };

        // Send Email
        const info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);

        res.status(200).json({ 
            success: true, 
            message: 'Project request received and confirmation email sent!',
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ success: false, message: 'Failed to process request. Please try again later.' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello! server is running correctly');
});

// Start Server
// Export the app for Vercel
module.exports = app;


// Start Server only if not running in Vercel (or dev mode)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

