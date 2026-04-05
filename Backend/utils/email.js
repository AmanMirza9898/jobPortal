import { Resend } from 'resend';

const sendEmail = async (options) => {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
            from: `JobSyncc <noreply@jobsyncc.com>`, 
            to: [options.email],
            replyTo: process.env.EMAIL_USER,
            subject: options.subject,
            html: options.message, 
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
