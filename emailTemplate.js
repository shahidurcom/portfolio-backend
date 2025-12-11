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

    // Generate a pseudo invoice number based on timestamp
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    
    // Default values
    const safeClientPhone = clientPhone || 'N/A';
    const safeClientCompany = clientCompany || 'N/A';
    const safeAdditionalInfo = additionalInfo || 'None';
    const safeReferenceFiles = referenceFiles || 'None provided';
    // Ensure budget is treated as a string or number for display
    const amount = budget || '0';

    return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Design Project Invoice</title>
</head>

<body style="margin:0; padding:0; background:#f1f3f7; font-family:Arial, sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellspacing="0" cellpadding="0" style="background:#f1f3f7; padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Container -->
        <table width="600" cellspacing="0" cellpadding="0"
          style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 6px 28px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td
              style="padding:40px; background:linear-gradient(135deg, #4f46e5, #6366f1); color:#ffffff; text-align:left;">
              <h1 style="margin:0; font-size:28px; font-weight:700;">Design Project Request</h1>
              <p style="margin:10px 0 0; font-size:14px; opacity:0.9;">Professional project summary & estimation details</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:40px;">

              <p style="font-size:16px; color:#333; margin:0 0 20px;">
                Hello <strong>${clientName}</strong>, <br />
                Below is your detailed design project summary & invoice breakdown.
              </p>

              <!-- CARD -->
              <table width="100%" cellspacing="0" cellpadding="0"
                style="margin-bottom:25px; background:#fafafa; border:1px solid #e5e7eb; border-radius:12px; padding:20px;">
                <tr>
                  <td>
                    <h2 style="font-size:18px; font-weight:700; color:#111; margin:0 0 12px;">1. Project Details</h2>

                    <p style="margin:4px 0; font-size:15px;"><strong>Project Name:</strong> ${projectName}</p>
                    <p style="margin:4px 0; font-size:15px;"><strong>Project Type:</strong> ${projectType}</p>
                    <p style="margin:4px 0; font-size:15px;">
                      <strong>Description:</strong><br />
                      <span style="font-size:14px; color:#555;">${projectDescription}</span>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- SCOPE -->
              <table width="100%" cellspacing="0" cellpadding="0"
                style="margin-bottom:25px; background:#fafafa; border:1px solid #e5e7eb; border-radius:12px; padding:20px;">
                <tr>
                  <td>
                    <h2 style="font-size:18px; font-weight:700; color:#111; margin:0 0 12px;">2. Project Scope</h2>
                    <p style="margin:4px 0;"><strong>Timeline:</strong> ${timeline}</p>
                    <p style="margin:4px 0;"><strong>Budget:</strong> ${amount}</p>
                    <p style="margin:4px 0;"><strong>References:</strong> ${safeReferenceFiles}</p>
                  </td>
                </tr>
              </table>

              <!-- CLIENT INFO -->
              <table width="100%" cellspacing="0" cellpadding="0"
                style="margin-bottom:25px; background:#fafafa; border:1px solid #e5e7eb; border-radius:12px; padding:20px;">
                <tr>
                  <td>
                    <h2 style="font-size:18px; font-weight:700; color:#111; margin:0 0 12px;">3. Client Information</h2>
                    <p style="margin:4px 0;"><strong>Name:</strong> ${clientName}</p>
                    <p style="margin:4px 0;"><strong>Email:</strong> ${clientEmail}</p>
                    <p style="margin:4px 0;"><strong>Phone:</strong> ${safeClientPhone}</p>
                    <p style="margin:4px 0;"><strong>Company:</strong> ${safeClientCompany}</p>
                    <p style="margin:4px 0;">
                      <strong>Additional Info:</strong><br />
                      <span style="font-size:14px; color:#555;">${safeAdditionalInfo}</span>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- INVOICE CARD -->
              <table width="100%" cellspacing="0" cellpadding="0"
                style="background:#ffffff; border:1px solid #d1d5db; border-radius:12px; padding:20px;">
                <tr>
                  <td>
                    <h2 style="font-size:20px; font-weight:700; color:#111; margin:0 0 20px;">4. Invoice Summary</h2>

                    <!-- INVOICE INFO GRID -->
                    <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
                      <tr>
                        <td style="padding:4px 0; font-size:14px;"><strong>Invoice #:</strong> ${invoiceNumber}</td>
                        <td style="padding:4px 0; font-size:14px;"><strong>Date:</strong> ${submissionDate}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0; font-size:14px;"><strong>Due:</strong> Upon Receipt</td>
                        <td style="padding:4px 0; font-size:14px;"><strong>Terms:</strong> Estimation</td>
                      </tr>
                    </table>

                    <!-- TABLE -->
                    <table width="100%" cellspacing="0" cellpadding="0"
                      style="border-collapse:collapse; margin-bottom:20px;">
                      <thead>
                        <tr style="background:#eef2ff;">
                          <th style="padding:10px; text-align:left; font-size:14px; border:1px solid #d1d5db;">Service</th>
                          <th style="padding:10px; text-align:left; font-size:14px; border:1px solid #d1d5db;">Qty</th>
                          <th style="padding:10px; text-align:left; font-size:14px; border:1px solid #d1d5db;">Rate</th>
                          <th style="padding:10px; text-align:left; font-size:14px; border:1px solid #d1d5db;">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="padding:10px; border:1px solid #e5e7eb;">Design Drafts</td>
                          <td style="padding:10px; border:1px solid #e5e7eb;">1</td>
                          <td style="padding:10px; border:1px solid #e5e7eb;">Included</td>
                          <td style="padding:10px; border:1px solid #e5e7eb;">Included</td>
                        </tr>
                        <tr style="background:#fafafa;">
                          <td style="padding:10px; border:1px solid #e5e7eb;">Final Deliverables</td>
                          <td style="padding:10px; border:1px solid #e5e7eb;">1</td>
                          <td style="padding:10px; border:1px solid #e5e7eb;">${amount}</td>
                          <td style="padding:10px; border:1px solid #e5e7eb;">${amount}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px; border:1px solid #e5e7eb;">Revisions</td>
                          <td style="padding:10px; border:1px solid #e5e7eb;">-</td>
                          <td style="padding:10px; border:1px solid #e5e7eb;">Included</td>
                          <td style="padding:10px; border:1px solid #e5e7eb;">$0.00</td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- Totals -->
                    <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
                      <tr>
                        <td style="text-align:right; padding:4px 0;"><strong>Subtotal:</strong> ${amount}</td>
                      </tr>
                      <tr>
                        <td style="text-align:right; padding:4px 0;"><strong>Tax:</strong> $0.00</td>
                      </tr>
                      <tr>
                        <td style="text-align:right; padding:8px 0; font-size:20px; font-weight:700; color:#4f46e5;">
                          TOTAL: ${amount}
                        </td>
                      </tr>
                    </table>

                    <!-- Payment Methods -->
                    <p style="font-size:14px; margin:0 0 10px;">
                      <strong>Payment Methods:</strong> Bank Transfer • PayPal • Stripe • Others
                    </p>

                    <p style="font-size:12px; color:#666; line-height:1.5;">
                      • Final files include: PNG, JPG, PDF, SVG, AI, etc.<br />
                      • Additional revisions may incur charges.<br />
                      • Thank you for choosing our design services!
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px; text-align:center; font-size:13px; color:#666;">
              Need changes? Just reply anytime.<br />
              <strong style="color:#111;">${agencyName}</strong>
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
