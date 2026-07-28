export interface OrderEmailData {
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    variant?: string;
    image?: string;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentStatus: string;
  paymentMethod: string;
  orderStatus?: string;
  created_at?: Date | string;
}

const PRIMARY_ADMIN_EMAIL = "shoutgospelworship@gmail.com";

/**
 * Creates Nodemailer Transporter using environment variables or Gmail defaults via dynamic import.
 */
async function getTransporter(): Promise<any> {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || PRIMARY_ADMIN_EMAIL;
  const pass = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");

  if (!pass) {
    console.warn("[ORDER NOTIFICATION] SMTP_PASS / App Password missing in environment.");
    return null;
  }

  try {
    // Dynamic import allows execution without requiring compile-time module resolution
    // @ts-ignore
    const nodemailerModule = await import("nodemailer");
    const nodemailer = nodemailerModule.default || nodemailerModule;

    const host = process.env.SMTP_HOST || "smtp.gmail.com";

    if (host.includes("gmail") || user.includes("@gmail.com")) {
      return nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      });
    }

    const port = Number(process.env.SMTP_PORT) || 465;
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  } catch (err) {
    console.warn("[ORDER NOTIFICATION] Nodemailer package not available or failed to load:", err);
    return null;
  }
}

/**
 * Generates clean HTML template for admin order notification email.
 */
function generateAdminOrderEmailHtml(order: OrderEmailData): string {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">
          ${item.name} ${item.variant ? `<br><span style="font-size: 12px; color: #6b7280;">Variant: ${item.variant}</span>` : ""}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: right;">
          $${item.price.toFixed(2)}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 600; text-align: right;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  const address = order.customer.address;
  const addressString = address
    ? `${address.street || ""}, ${address.city || ""}, ${address.state || ""} ${address.zip || ""}, ${address.country || "USA"}`
    : "No address provided";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order Notification - ${order.orderNumber}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0C1220 0%, #1A233A 100%); padding: 24px; text-align: center;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">
            SOAR GLOBAL FOUNDATION
          </h1>
          <p style="color: #ffffff; margin: 6px 0 0 0; font-size: 14px;">
            🛍️ New Product Order Received!
          </p>
        </div>

        <!-- Alert Badge -->
        <div style="background-color: #ecfdf5; border-bottom: 1px solid #a7f3d0; padding: 12px 24px; text-align: center; color: #047857; font-size: 14px; font-weight: 600;">
          Order #${order.orderNumber} • Total Amount: $${order.total.toFixed(2)}
        </div>

        <div style="padding: 24px;">
          <!-- Customer Details -->
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
            <h3 style="margin-top: 0; color: #111827; font-size: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
              👤 Customer Information
            </h3>
            <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Name:</strong> ${order.customer.name}</p>
            <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${order.customer.email}" style="color: #2563eb; text-decoration: none;">${order.customer.email}</a></p>
            <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Phone:</strong> ${order.customer.phone || "N/A"}</p>
            <p style="margin: 4px 0; color: #374151; font-size: 14px;"><strong>Shipping Address:</strong> ${addressString}</p>
          </div>

          <!-- Order Details Table -->
          <h3 style="color: #111827; font-size: 15px; margin-bottom: 12px;">📦 Ordered Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <thead>
              <tr style="background-color: #f3f4f6; text-align: left; color: #4b5563; font-size: 12px; text-transform: uppercase;">
                <th style="padding: 10px 12px;">Item</th>
                <th style="padding: 10px 12px; text-align: center;">Qty</th>
                <th style="padding: 10px 12px; text-align: right;">Price</th>
                <th style="padding: 10px 12px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Financial Summary -->
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="color: #4b5563; padding: 4px 0;">Subtotal:</td>
                <td style="text-align: right; font-weight: 500; color: #111827;">$${order.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="color: #4b5563; padding: 4px 0;">Shipping:</td>
                <td style="text-align: right; font-weight: 500; color: #10b981;">Free ($0.00)</td>
              </tr>
              <tr>
                <td style="color: #4b5563; padding: 4px 0;">Tax:</td>
                <td style="text-align: right; font-weight: 500; color: #111827;">$${order.tax.toFixed(2)}</td>
              </tr>
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="font-weight: 700; color: #111827; padding-top: 8px; font-size: 16px;">Grand Total:</td>
                <td style="text-align: right; font-weight: 800; color: #D4AF37; padding-top: 8px; font-size: 18px;">$${order.total.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <!-- Metadata -->
          <div style="font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; pt-16px; padding-top: 12px;">
            <p style="margin: 3px 0;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p style="margin: 3px 0;"><strong>Payment Status:</strong> ${order.paymentStatus}</p>
            <p style="margin: 3px 0;"><strong>Order Status:</strong> ${order.orderStatus || "Processing"}</p>
            <p style="margin: 3px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
          Automated Order Notification System • SOAR Global Foundation Admin
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Sends order notification email to shoutgospelworship@gmail.com (and optionally customer receipt).
 */
export async function sendOrderNotificationEmail(order: OrderEmailData): Promise<{ success: boolean; message?: string }> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || PRIMARY_ADMIN_EMAIL;
  
  console.log(`[ORDER NOTIFICATION] Processing order notification for Order #${order.orderNumber} -> Target Admin: ${adminEmail}`);

  try {
    const transporter = await getTransporter();

    if (!transporter) {
      console.warn(`[ORDER NOTIFICATION] SMTP credentials not set or transporter unavailable. Email notification details logged below:`);
      console.log(`================ ORDER NOTIFICATION SUMMARY ================`);
      console.log(`Target Email: ${adminEmail}`);
      console.log(`Order Number: #${order.orderNumber}`);
      console.log(`Customer: ${order.customer.name} (${order.customer.email})`);
      console.log(`Total Amount: $${order.total.toFixed(2)}`);
      console.log(`Items: ${order.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")}`);
      console.log(`============================================================`);
      return {
        success: true,
        message: "Logged locally (configure SMTP_PASS in .env for live inbox delivery)"
      };
    }

    const htmlContent = generateAdminOrderEmailHtml(order);

    // Send to Admin (shoutgospelworship@gmail.com)
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'SOAR Store'}" <${process.env.SMTP_USER || adminEmail}>`,
      to: adminEmail,
      subject: `🛍️ New Order Received #${order.orderNumber} ($${order.total.toFixed(2)}) - ${order.customer.name}`,
      html: htmlContent,
      text: `New Order ${order.orderNumber} received!\nCustomer: ${order.customer.name} (${order.customer.email})\nTotal: $${order.total.toFixed(2)}\nItems: ${order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}`
    });

    console.log(`[ORDER NOTIFICATION] Successfully sent order email to admin: ${adminEmail}`);

    // Optional: Send customer receipt if customer email is provided
    if (order.customer.email && order.customer.email.toLowerCase() !== adminEmail.toLowerCase()) {
      try {
        await transporter.sendMail({
          from: `"${process.env.SMTP_FROM_NAME || 'SOAR Store'}" <${process.env.SMTP_USER || adminEmail}>`,
          to: order.customer.email,
          subject: `Order Confirmation #${order.orderNumber} - SOAR Store`,
          html: htmlContent.replace("🛍️ New Product Order Received!", "Thank you for your order! Here is your confirmation:"),
        });
        console.log(`[ORDER NOTIFICATION] Customer receipt sent to: ${order.customer.email}`);
      } catch (custErr) {
        console.error(`[ORDER NOTIFICATION] Could not send receipt to customer:`, custErr);
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error(`[ORDER NOTIFICATION ERROR] Failed to send email for order ${order.orderNumber}:`, error);
    return { success: false, message: error?.message || "Failed to send email" };
  }
}

/**
 * Sends Contact / Volunteer inquiry email to shoutgospelworship@gmail.com
 */
export async function sendInquiryNotificationEmail(inquiry: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message?: string }> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || PRIMARY_ADMIN_EMAIL;

  try {
    const transporter = await getTransporter();
    if (!transporter) {
      console.log(`[INQUIRY NOTIFICATION LOGGED] From: ${inquiry.name} (${inquiry.email}) | Subject: ${inquiry.subject || "General Inquiry"}`);
      return { success: true };
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
          <h2 style="color: #5E2B97; margin-top: 0;">📬 New Website Form Submission</h2>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 4px 0; font-size: 14px;"><strong>From:</strong> ${inquiry.name} (<a href="mailto:${inquiry.email}">${inquiry.email}</a>)</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Subject:</strong> ${inquiry.subject || "General Contact Inquiry"}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <h3 style="color: #111827; font-size: 15px; margin-bottom: 8px;">Message Content:</h3>
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; font-size: 14px; color: #374151; white-space: pre-wrap;">${inquiry.message}</div>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 24px; border-top: 1px solid #eee; padding-top: 12px;">This form submission is also saved in your SOAR Admin Dashboard Web Email Inbox.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'SOAR Website'}" <${process.env.SMTP_USER || adminEmail}>`,
      to: adminEmail,
      subject: `📬 New Submission: ${inquiry.subject || 'Website Inquiry'} - ${inquiry.name}`,
      html: htmlContent,
      text: `New Form Submission from ${inquiry.name} (${inquiry.email})\nSubject: ${inquiry.subject || 'Inquiry'}\n\nMessage:\n${inquiry.message}`
    });

    console.log(`[INQUIRY NOTIFICATION] Sent email to: ${adminEmail}`);
    return { success: true };
  } catch (err: any) {
    console.error(`[INQUIRY NOTIFICATION ERROR]`, err);
    return { success: false, message: err?.message };
  }
}

/**
 * Sends Newsletter Subscriber email notification to shoutgospelworship@gmail.com
 */
export async function sendNewsletterNotificationEmail(email: string): Promise<{ success: boolean }> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || PRIMARY_ADMIN_EMAIL;

  try {
    const transporter = await getTransporter();
    if (!transporter) {
      console.log(`[NEWSLETTER NOTIFICATION LOGGED] New subscriber: ${email}`);
      return { success: true };
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb;">
          <h2 style="color: #D4AF37; margin-top: 0;">📰 New Newsletter Subscriber!</h2>
          <p style="font-size: 15px; color: #374151;">A new visitor subscribed to the SOAR Global Foundation newsletter:</p>
          <div style="background-color: #f3f4f6; padding: 12px 16px; border-radius: 8px; font-weight: bold; color: #111827;">
            ✉️ <a href="mailto:${email}">${email}</a>
          </div>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">Subscribed on ${new Date().toLocaleString()}. Saved in Admin Dashboard.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'SOAR Website'}" <${process.env.SMTP_USER || adminEmail}>`,
      to: adminEmail,
      subject: `📰 New Newsletter Subscriber: ${email}`,
      html: htmlContent,
      text: `New subscriber joined your newsletter list: ${email}`
    });

    console.log(`[NEWSLETTER NOTIFICATION] Sent notification for ${email}`);
    return { success: true };
  } catch (err) {
    console.error(`[NEWSLETTER NOTIFICATION ERROR]`, err);
    return { success: false };
  }
}

/**
 * Sends Donation notification email to shoutgospelworship@gmail.com
 */
export async function sendDonationNotificationEmail(donation: {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  giftType?: string;
  fundCategory?: string;
  message?: string;
}): Promise<{ success: boolean }> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || PRIMARY_ADMIN_EMAIL;

  try {
    const transporter = await getTransporter();
    if (!transporter) {
      console.log(`[DONATION NOTIFICATION LOGGED] Donor: ${donation.donorName} ($${donation.amount})`);
      return { success: true };
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb;">
          <h2 style="color: #047857; margin-top: 0;">❤️ New Donation Received!</h2>
          <div style="background-color: #ecfdf5; border-bottom: 1px solid #a7f3d0; padding: 12px 16px; border-radius: 8px; font-size: 16px; font-weight: bold; color: #047857; margin-bottom: 16px;">
            Amount: $${donation.amount.toFixed(2)} (${donation.giftType || "One-time"})
          </div>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Donor Name:</strong> ${donation.donorName}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${donation.donorEmail}">${donation.donorEmail}</a></p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Phone:</strong> ${donation.donorPhone || "N/A"}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Designation:</strong> ${donation.fundCategory || "General Fund"}</p>
          ${donation.message ? `<p style="margin: 12px 0 4px 0; font-size: 14px;"><strong>Donor Note:</strong> ${donation.message}</p>` : ""}
          <p style="font-size: 12px; color: #9ca3af; margin-top: 20px; border-top: 1px solid #eee; padding-top: 12px;">This donation is also saved in your SOAR Admin Dashboard.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'SOAR Website'}" <${process.env.SMTP_USER || adminEmail}>`,
      to: adminEmail,
      subject: `❤️ New Donation: $${donation.amount.toFixed(2)} from ${donation.donorName}`,
      html: htmlContent,
      text: `New donation received!\nDonor: ${donation.donorName} (${donation.donorEmail})\nAmount: $${donation.amount.toFixed(2)}\nDesignation: ${donation.fundCategory || 'General'}`
    });

    console.log(`[DONATION NOTIFICATION] Sent donation notification to: ${adminEmail}`);
    return { success: true };
  } catch (err) {
    console.error(`[DONATION NOTIFICATION ERROR]`, err);
    return { success: false };
  }
}
