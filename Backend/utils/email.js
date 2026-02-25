import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    try {
        const { data, error } = await resend.emails.send({
            from: `JobSyncc <onboarding@resend.dev>`, // Default Resend domain if not fully verified, or use verified domain
            to: [options.email],
            subject: options.subject,
            html: options.message, // Use 'html' for styled emails, or 'text' for plain text
        });

        if (error) {
            console.error('Resend Email Error:', error);
            throw error;
        }

        console.log('Email sent successfully via Resend. ID:', data.id);
        return data;
    } catch (error) {
        console.error('Resend Exception:', error);
        throw error;
    }
};

export default sendEmail;
