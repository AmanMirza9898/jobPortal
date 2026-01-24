import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook, Search, Briefcase } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-slate-600 font-sans pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section: Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand and Mission - 5 columns wide */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-2xl">
              <Briefcase size={28} />
              <span>Job<span className="text-slate-900">Portal</span></span>
            </div>
            <p className="text-[15px] leading-relaxed">
              India's leading career platform helping millions of job seekers find their dream roles.
              We bridge the gap between talented professionals and top-tier organizations,
              providing advanced tools for <strong>Resume Building, Job Tracking, and AI-based Matchmaking.</strong>
            </p>
            <p className="text-[14px]">
              <span className="font-bold text-slate-900">For Hiring:</span> From tech startups to Fortune 500 companies,
              we provide enterprise-grade recruitment solutions, background verification, and skill assessment
              tools to find the perfect fit for your teams.
            </p>
            <p className="italic text-blue-600 font-medium">"Your Career Growth, Our Ultimate Mission."</p>
          </div>

          {/* For Candidates - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-slate-900 font-bold text-lg mb-6">Candidates</h3>
            <ul className="space-y-3 text-[15px]">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Browse All Jobs</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Create Resume</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Job Alerts</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Company Reviews</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Salary Insights</a></li>
            </ul>
          </div>

          {/* For Employers - 3 columns */}
          <div className="lg:col-span-3">
            <h3 className="text-slate-900 font-bold text-lg mb-6">Employers</h3>
            <ul className="space-y-3 text-[15px]">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Post a Free Job</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Hire Talent</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">ATS Solutions</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Resume Database Access</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Employer Branding</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Staffing Services</a></li>
            </ul>
          </div>

          {/* Quick Support - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-slate-900 font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3 text-[15px]">
              <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        {/* Contact & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-t border-slate-100">
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4 text-[15px]">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600" />
                <a href="mailto:support@jobportal.com" className="hover:underline">support@jobportal.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600" />
                <span>+91 1234 567 890</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 mt-1 shrink-0" />
                <span>Sector 44, Gurugram, Haryana - 122003</span>
              </div>
            </div>
          </div>

          <div className="md:text-right">
            <h3 className="text-slate-900 font-bold text-lg mb-6 md:pr-2">Connect With Us</h3>
            <div className="flex md:justify-end gap-3 mb-6">
              {[Linkedin, Twitter, Instagram, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="p-3 border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-sm">
              Recognized as the <span className="text-blue-600 font-semibold">Best Career Platform 2024</span>
            </p>
          </div>
        </div>

        {/* Job Category SEO Tag Cloud - Very important for Job Portals */}
        <div className="bg-slate-50 p-8 rounded-xl mt-8">
          <p className="text-[12px] leading-relaxed text-slate-400 text-center uppercase tracking-tight">
            <span className="font-bold text-slate-600">Top Job Searches:</span> Software Engineer Jobs | Remote Jobs | Marketing Jobs in Delhi | Data Science Roles | Java Developer Jobs in Gurugram | Work From Home Jobs | Finance Manager Vacancy | HR Generalist Roles | Customer Support Jobs | Graphic Designer Jobs | Sales Executive Openings | Frontend Developer | Backend Developer | Full Stack Developer | UI/UX Designer | Product Manager | Civil Engineer | Mechanical Engineer | Teacher Jobs | Nurse Openings | Bank Jobs | Government Jobs | Part Time Jobs | Internship for Students | IT Jobs | Freshers Jobs | Jobs for Women | Recruitment in USA | Jobs in Dubai | Jobs in Canada | Jobs in Australia | Freelance Projects | Part Time Income | High Paying Jobs | Walk-in Interviews | BPO Jobs | Hospitality Jobs | Healthcare Careers | Digital Marketing Jobs | SEO Specialist Roles | Content Writer Openings | Accounting Jobs | Legal Consultant Roles | Management Trainee | Business Analyst | Project Coordinator | Quality Assurance Jobs | DevOps Engineer | Cyber Security Roles | Cloud Architect | Mobile App Developer | React Native Developer | Python Developer | PHP Developer | .NET Developer | WordPress Developer | Shopify Specialist | Data Entry Jobs | Administrative Assistant | Receptionist Jobs
          </p>
        </div>

        {/* Final Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
          © {currentYear} JobPortal. Connect. Apply. Grow.
        </div>
      </div>
    </footer>
  );
};

