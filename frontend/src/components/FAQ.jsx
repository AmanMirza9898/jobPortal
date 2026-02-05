import React, { useState } from 'react';

const FAQData = [
    {
        question: "How do I search for jobs?",
        answer: "You can search for jobs by entering keywords, job titles, or companies in the search bar on the homepage. You can also filter results by location, salary, and job type."
    },
    {
        question: "Is this service free for job seekers?",
        answer: "Yes, our platform is completely free for job seekers. You can create a profile, upload your resume, and apply to unlimited jobs without any cost."
    },
    {
        question: "How can I update my profile?",
        answer: "To update your profile, log in to your account and navigate to the 'Profile' section. Click on the 'Edit' button to update your personal details, resume, and skills."
    },
    {
        question: "Can I apply for multiple jobs?",
        answer: "Absolutely! You can apply for as many jobs as you like. We encourage you to tailor your application to each specific role to increase your chances of success."
    },
    {
        question: "How do I contact support?",
        answer: "If you have any questions or need assistance, you can reach out to our support team via the 'Contact Us' page or email us directly at support@jobportal.com."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {FAQData.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none bg-transparent hover:bg-white/30 transition-colors duration-200"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                                <span className={`ml-6 shrink-0 text-gray-500 transform transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    } overflow-hidden bg-transparent`}
                            >
                                <p className="px-6 py-4 text-gray-600 border-t border-gray-100 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
