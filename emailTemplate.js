/**
 * Generates the HTML email content for the project request confirmation.
 * @param {Object} data - The form data and derived values.
 * @returns {string} The complete HTML string.
 */
const generateEmailHtml = (data) => {
    const {
        projectName,
        clientName,
        clientCompany,
        // For the confirmation email, we treat "amountPaid" as "Estimated Budget" or similar if needed, 
        // but based on the form, we have 'budget'. 
        // The original PHP had a specific receipts section. We will adapt this.
        budget, 
        submissionDate,
        projectType,
        projectDescription,
        timeline,
        referenceFiles,
        clientEmail,
        clientPhone,
        additionalInfo,
        agencyName,
        agencyWebsite,
        agencyPhone,
        agencyEmail
    } = data;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Project Request Confirmation</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 py-10" style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      Project Request Confirmation – 
      <span class="text-blue-600">${projectName}</span>
    </h2>

    <p class="text-gray-700">
      Hi <strong>${clientName}</strong>,<br><br>
      Thank you for reaching out! This email confirms that we've successfully 
      received your project request. We're excited to review your requirements.
    </p>

    <!-- Request Details (Adapted from Payment Receipt) -->
    <h3 class="text-xl font-semibold text-gray-800 mt-8 border-b pb-2">🧾 Request Summary</h3>

    <div class="mt-3 text-gray-700 space-y-1">
      <p><strong>Project Name:</strong> ${projectName}</p>
      <p><strong>Client:</strong> ${clientName} ${clientCompany ? `(${clientCompany})` : ''}</p>
      <p><strong>Submission Date:</strong> ${submissionDate}</p>
    </div>

    <!-- Project Details -->
    <h3 class="text-xl font-semibold text-gray-800 mt-8 border-b pb-2">📘 Project Details</h3>

    <div class="mt-3 text-gray-700 space-y-1">
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Project Description:</strong><br> ${projectDescription.replace(/\n/g, '<br>')}</p>
    </div>

    <!-- Scope -->
    <h3 class="text-xl font-semibold text-gray-800 mt-8 border-b pb-2">📋 Project Scope</h3>

    <div class="mt-3 text-gray-700 space-y-1">
      <p><strong>Expected Timeline:</strong> ${timeline}</p>
      <p><strong>Budget Range:</strong> ${budget}</p>
      <p><strong>Reference Materials:</strong> ${referenceFiles || 'None provided'}</p>
    </div>

    <!-- Client Info -->
    <h3 class="text-xl font-semibold text-gray-800 mt-8 border-b pb-2">👤 Client Information</h3>

    <div class="mt-3 text-gray-700 space-y-1">
      <p><strong>Full Name:</strong> ${clientName}</p>
      <p><strong>Email:</strong> ${clientEmail}</p>
      <p><strong>Phone:</strong> ${clientPhone || 'N/A'}</p>
      ${clientCompany ? `<p><strong>Company:</strong> ${clientCompany}</p>` : ''}
      <p><strong>Additional Information:</strong><br> ${additionalInfo ? additionalInfo.replace(/\n/g, '<br>') : 'None'}</p>
    </div>

    <!-- Next Steps -->
    <h3 class="text-xl font-semibold text-gray-800 mt-8 border-b pb-2">🚀 Next Steps</h3>

    <p class="text-gray-700 mt-3">
      We’ll review your project details and follow up within 
      <strong>24–48 hours</strong> to:<br><br>
      ✔ Confirm the project scope<br>
      ✔ Share the estimated timeline<br>
      ✔ Discuss the next steps
    </p>

    <p class="text-gray-700 mt-4">
      If you have any questions, just reply to this email.
    </p>

    <div class="text-center text-gray-500 text-sm mt-10">
      Thank you for seeking us out!<br>
      <strong>${agencyName}</strong><br>
      <a href="${agencyWebsite}" class="text-blue-600 underline">${agencyWebsite}</a><br>
      ${agencyPhone ? `${agencyPhone} • ` : ''} ${agencyEmail}
    </div>

  </div>
</body>
</html>
    `;
};

module.exports = { generateEmailHtml };
