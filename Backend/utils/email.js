import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async (options) => {
    try {
        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: options.subject,
            textContent: options.message,
            sender: { "name": "JobSync", "email": process.env.EMAIL_FROM },
            to: [{ "email": options.email }]
        });

        console.log('Email sent successfully via Brevo. Message ID:', result.messageId);
        return result;
    } catch (error) {
        console.error('Brevo Email Error:', error);
        throw error;
    }
};

export default sendEmail;
