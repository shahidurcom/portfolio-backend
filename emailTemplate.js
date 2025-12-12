/**
 * Generates the HTML email content for the project request confirmation.
 * @param {Object} data - The form data and derived values.
 * @returns {string} The complete HTML string.
 */
const generateEmailHtml = (data) => {
    // -------------------------------------------------------------------------
    // 1. DESTRUCTURING ASSIGNMENT
    // -------------------------------------------------------------------------
    // We extract specific properties from the 'data' object into individual variables.
    // This makes the code cleaner, allowing us to use 'clientName' instead of 'data.clientName'.
    const {
        projectName,
        clientName,
        clientCompany,
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
        agencyWebsite, // Can be used for links or footer
        agencyPhone,   // Can be used in footer
        agencyEmail    // Can be used in footer
    } = data;

    // -------------------------------------------------------------------------
    // 2. LOGIC & DEFAULT VALUES
    // -------------------------------------------------------------------------
    
    // Generate a unique Invoice Number using the current timestamp.
    // .toString() converts the number to a string.
    // .slice(-6) takes the last 6 characters to keep it short.
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    
    // Handling optional fields with Default Values using the OR (||) operator.
    // If 'clientPhone' is null, undefined, or empty, 'N/A' will be assigned.
    const safeClientPhone = clientPhone || 'N/A';
    const safeClientCompany = clientCompany || 'N/A';
    const safeAdditionalInfo = additionalInfo || 'None';
    const safeReferenceFiles = referenceFiles || 'None provided';
    
    // Ensure 'budget' has a value to display in the invoice amount sections.
    const amount = budget || '0';

    // -------------------------------------------------------------------------
    // 3. HTML EMAIL TEMPLATE
    // -------------------------------------------------------------------------
    // We use Template Literals (backticks ` `) to define a multi-line string.
    // Variables are injected using the ${variable} syntax.
    // Inline CSS (style="...") is essential because many email clients (Gmail, Outlook)
    // strip out <style> tags in the <head> or external CSS files.
    
    return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Premium Invoice Email</title>
</head>

<body style="margin:0; padding:0; background:#f4f5f7; font-family:Arial, sans-serif;">

  <!-- Outer Wrapper: Centers the content and provides a background color -->
  <table width="100%" cellspacing="0" cellpadding="0" style="background:#f4f5f7; padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Main Card: The white box containing the invoice -->
        <table width="650" cellspacing="0" cellpadding="0"
          style="background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

          <!-- Banner Section (Optional) 
          <tr>
            <td style="padding:0; margin:0;">
              <img src="https://via.placeholder.com/650x150/4f46e5/ffffff?text=Project+Confirmation" width="650" alt="Banner"
                style="display:block; width:100%; height:auto; border:0;" />
            </td>
          </tr>
          -->

          <!-- Logo Section (Optional: Replace src with your actual logo URL) -->
          <!-- 
          <tr>
            <td style="padding:25px 40px 10px; text-align:left;">
              <img src="https://via.placeholder.com/140x50?text=Logo" alt="Logo"
                style="width:140px; height:auto; display:block;" />
            </td>
          </tr>
          -->

          <!-- Header Section -->
          <tr>
            <td
              style="padding:20px 40px; background:linear-gradient(135deg,#4338ca,#6366f1); color:white; border-radius:12px; margin:0 20px;">
              <h1 style="margin:0; font-size:28px; font-weight:700;">🧾 Design Project Invoice</h1>
              <p style="margin:8px 0 0; font-size:15px; opacity:0.9;">Prepared especially for you</p>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td style="padding:40px;">

              <!-- Greeting -->
              <p style="font-size:17px; color:#333; margin:0 0 20px;">
                👋 Hello <strong>${clientName}</strong>,  
                <br />Here is your professionally prepared invoice summary for your project request.
              </p>

              <!-- Section 1: Project Details -->
              <table width="100%" cellspacing="0" cellpadding="0"
                style="margin-bottom:25px; background:#fafafa; border-radius:14px; border:1px solid #e5e7eb; padding:22px;">
                <tr>
                  <td>
                    <h2 style="font-size:18px; margin:0 0 10px;">📁 Project Details</h2>

                    <p style="margin:5px 0;"><strong>Project Name:</strong> ${projectName}</p>
                    <p style="margin:5px 0;"><strong>Type:</strong> ${projectType}</p>
                    <p style="margin:5px 0;">
                      <strong>Description:</strong><br />
                      <span style="font-size:14px; color:#555;">${projectDescription}</span>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Section 2: Project Scope -->
              <table width="100%" cellspacing="0" cellpadding="0"
                style="margin-bottom:25px; background:#fafafa; border-radius:14px; border:1px solid #e5e7eb; padding:22px;">
                <tr>
                  <td>
                    <h2 style="font-size:18px; margin:0 0 10px;">🛠 Project Scope</h2>

                    <p style="margin:5px 0;"><strong>Timeline:</strong> ${timeline}</p>
                    <p style="margin:5px 0;"><strong>Budget:</strong> ${amount}</p>
                    <p style="margin:5px 0;"><strong>References:</strong> ${safeReferenceFiles}</p>
                  </td>
                </tr>
              </table>

              <!-- Section 3: Client Information -->
              <table width="100%" cellspacing="0" cellpadding="0"
                style="margin-bottom:25px; background:#fafafa; border-radius:14px; border:1px solid #e5e7eb; padding:22px;">
                <tr>
                  <td>
                    <h2 style="font-size:18px; margin:0 0 10px;">👤 Client Information</h2>

                    <p style="margin:5px 0;"><strong>Name:</strong> ${clientName}</p>
                    <p style="margin:5px 0;"><strong>Email:</strong> ${clientEmail}</p>
                    <p style="margin:5px 0;"><strong>Phone:</strong> ${safeClientPhone}</p>
                    <p style="margin:5px 0;"><strong>Company:</strong> ${safeClientCompany}</p>
                    <p style="margin:5px 0;">
                      <strong>Additional Info:</strong><br />
                      <span style="font-size:14px; color:#555;">${safeAdditionalInfo}</span>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Section 4: INVOICE SUMMARY -->
              <table width="100%" cellspacing="0" cellpadding="0"
                style="border-radius:14px; border:1px solid #d1d5db; padding:22px;">
                <tr>
                  <td>

                    <h2 style="font-size:20px; margin:0 0 16px;">💰 Invoice Summary</h2>

                    <!-- Invoice Meta Info (Number, Date) -->
                    <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:18px;">
                      <tr>
                        <td style="padding:4px 0; font-size:14px;"><strong>Invoice #:</strong> ${invoiceNumber}</td>
                        <td style="padding:4px 0; font-size:14px;"><strong>Date:</strong> ${submissionDate}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0; font-size:14px;"><strong>Due:</strong> Upon Receipt</td>
                        <td style="padding:4px 0; font-size:14px;"><strong>Terms:</strong> Estimation</td>
                      </tr>
                    </table>

                    <!-- Invoice Itemized Table -->
                    <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                      <thead>
                        <tr style="background:#eef2ff;">
                          <th style="padding:12px; border:1px solid #d1d5db; text-align:left;">Service</th>
                          <th style="padding:12px; border:1px solid #d1d5db; text-align:left;">Qty</th>
                          <th style="padding:12px; border:1px solid #d1d5db; text-align:left;">Rate</th>
                          <th style="padding:12px; border:1px solid #d1d5db; text-align:left;">Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td style="padding:12px; border:1px solid #e5e7eb;">🎨 Design Drafts</td>
                          <td style="padding:12px; border:1px solid #e5e7eb;">1</td>
                          <td style="padding:12px; border:1px solid #e5e7eb;">Included</td>
                          <td style="padding:12px; border:1px solid #e5e7eb;">Included</td>
                        </tr>
                        <tr style="background:#fafafa;">
                          <td style="padding:12px; border:1px solid #e5e7eb;">📦 Final Deliverables</td>
                          <td style="padding:12px; border:1px solid #e5e7eb;">1</td>
                          <td style="padding:12px; border:1px solid #e5e7eb;">${amount}</td>
                          <td style="padding:12px; border:1px solid #e5e7eb;">${amount}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px; border:1px solid #e5e7eb;">🔄 Revisions</td>
                          <td style="padding:12px; border:1px solid #e5e7eb;">7 Days</td>
                          <td style="padding:12px; border:1px solid #e5e7eb;">Included</td>
                          <td style="padding:12px; border:1px solid #e5e7eb;">$0</td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- Totals Section -->
                    <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:18px;">
                      <tr>
                        <td style="text-align:right; padding:5px 0; font-size:15px;">
                          <strong>Subtotal:</strong> ${amount}
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:right; padding:5px 0; font-size:15px;">
                          <strong>Tax:</strong> $0.00
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="text-align:right; padding:10px 0; font-size:24px; font-weight:800; color:#4338ca;">
                          Total: ${amount}
                        </td>
                      </tr>
                    </table>

                    <!-- Payment Information -->
                    <p style="font-size:14px; margin:16px 0;">
                      <strong>Payment Methods:</strong> 💳 Card • 💼 Bank • 🌐 PayPal • 💸 Wise
                    </p>

                    <!-- Additional Information
                    <p style="font-size:12px; color:#666; line-height:1.6;">
                      • Final files include PNG, JPG, SVG, PDF, AI<br />
                      • Any extra revisions may incur additional charges<br />
                      • Thank you for choosing our creative service ❤️
                    </p>
                    -->
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        <!-- Footer Section -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center;">
              <p style="margin:10px 0 0; font-size:14px; color:#555;">
                Thank You<br>
                Thank you for choosing our design services!
              </p>
              <p style="margin:15px 0 0; font-size:13px; color:#333; line-height:1.6;">
                <strong>Project Request Form:</strong> <a href="https://shahidur.com" style="color:#4338ca; text-decoration:none;">shahidur.com</a><br>
                <strong>Portfolio:</strong> Shahidur Rahaman – Designer<br>
                <strong>Email:</strong> <a href="mailto:portfolio@shahidur.com" style="color:#4338ca; text-decoration:none;">portfolio@shahidur.com</a><br>
                <strong>Mobile:</strong> <a href="tel:+8801834418446" style="color:#4338ca; text-decoration:none;">+8801834418446</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>

</html>
    `;
};

module.exports = { generateEmailHtml };
