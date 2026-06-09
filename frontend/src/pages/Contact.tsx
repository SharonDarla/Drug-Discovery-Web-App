import React, { useState } from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/shared/Card';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { Mail, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error on type
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Mock API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <Navbar />

      <main className="flex-grow container px-4 py-12 mx-auto max-w-7xl">
        <PageHeader 
          title="Get in"
          gradientTitle="Touch"
          subtitle="Have technical questions, collaboration ideas, or need support? Drop a message."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7">
            <Card hoverEffect={false} className="p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-850 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-600" />
                Submit Inquiries
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Name
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="e.g. Dr. Sharon Darla"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Email Address
                  </label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. sharon@biotech.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    name="subject"
                    placeholder="e.g. Partnership Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Message Body
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Write detailed questions here..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`flex w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 ${
                      errors.message ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10' : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-500 font-medium animate-fadeIn">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full text-center" 
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Column: Address/Socials */}
          <div className="lg:col-span-5 space-y-6">
            <Card hoverEffect={true} className="p-6">
              <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Inquiries Email</h4>
                    <a href="mailto:[darlasharon94@gmail.com]" className="text-sm font-semibold text-slate-700 dark:text-slate-350 hover:text-blue-600 transition-colors mt-0.5 block">
                      darlasharon94@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card hoverEffect={true} className="p-6">
              <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 mb-4">Connect Digitally</h3>
              <div className="space-y-4">
                <a 
                  href="https://www.linkedin.com/in/sharon-darla/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350 group-hover:text-blue-600 transition-colors">LinkedIn</h4>
                  </div>
                </a>

                <a 
                  href="https://github.com/SharonDarla" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">GitHub</h4>
                  </div>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* Success Notification Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Message Dispatched"
        className="max-w-md"
      >
        <div className="flex flex-col items-center text-center py-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full mb-4 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h4 className="text-lg font-bold text-slate-850 dark:text-slate-100">
            Thank you for reaching out!
          </h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
            Your inquiry was submitted successfully. 
          </p>
          <Button 
            onClick={() => setIsSuccessModalOpen(false)} 
            className="mt-6 w-full"
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
