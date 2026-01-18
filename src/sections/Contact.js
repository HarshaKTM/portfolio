import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { useState } from 'react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (submitMessage || submitError) {
      setSubmitMessage('');
      setSubmitError('');
    }
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'Harshakumara1998030944@gmail.com' },
    { icon: FiPhone, label: 'Phone', value: '+94 773351707' },
    { icon: FiMapPin, label: 'Location', value: '220, Sudarshana Mawatha, Malabe' },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/HarshaKTM', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="section-cinematic bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(201, 162, 39, 0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="section-header mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="section-number"
          >
            05
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-cinzel text-white tracking-[0.1em]"
          >
            Get In Touch
          </motion.h2>
          <div className="divider-gold" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/50 font-raleway tracking-wider max-w-xl mx-auto mt-4"
          >
            Feel free to reach out for collaborations or just to say hello
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-cinzel text-xl text-white tracking-wide mb-8">
              Contact Information
            </h3>

            <div className="space-y-6 mb-12">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 border border-[#c9a227]/30 flex items-center justify-center text-[#c9a227]">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-raleway text-xs tracking-[0.2em] uppercase text-white/50 mb-1">
                      {item.label}
                    </h4>
                    <p className="font-raleway text-white/80">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-raleway text-xs tracking-[0.2em] uppercase text-white/50 mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-cinzel text-xl text-white tracking-wide mb-8">
              Send Message
            </h3>

            <form
              action="https://formspree.io/f/myyqvboe"
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-raleway text-xs tracking-[0.2em] uppercase text-white/50 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="input-cinematic"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-raleway text-xs tracking-[0.2em] uppercase text-white/50 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="input-cinematic"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-raleway text-xs tracking-[0.2em] uppercase text-white/50 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="input-cinematic"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-raleway text-xs tracking-[0.2em] uppercase text-white/50 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-cinematic resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>

              {/* Honeypot */}
              <div className="hidden">
                <input type="text" name="_gotcha" />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-cinematic btn-gold flex items-center gap-3 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <FiSend size={14} />
              </motion.button>

              {submitMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 font-raleway text-sm"
                >
                  {submitMessage}
                </motion.p>
              )}

              {submitError && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 font-raleway text-sm"
                >
                  {submitError}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 