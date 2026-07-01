import emailjs from "@emailjs/browser";

export const sendGoalTransactionEmail = async ({
  recipientEmail,
  goalTitle,
  action,
  amount,
  savedAmount,
}) => {
  if (!recipientEmail) {
    console.warn("Email notification skipped: no recipient email.");
    return;
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn(
      "Email notification is not configured. Add EmailJS env vars: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY.",
    );
    return;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: recipientEmail,
        goal_title: goalTitle,
        action,
        amount,
        saved_amount: savedAmount,
      },
      publicKey,
    );
  } catch (error) {
    console.warn("Email notification failed:", error);
  }
};
