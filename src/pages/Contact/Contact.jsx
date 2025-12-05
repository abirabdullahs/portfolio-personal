import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare, Clock, CheckCircle } from "lucide-react";
import SEO from '../../components/SEO';
import { app } from "../../firebase";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(app);

// Social Links
const socialLinks = [
  { name: "GitHub", href: "https://github.com/abirabdullahofficial", icon: Github, color: "hover:text-gray-400" },
  { name: "LinkedIn", href: "https://linkedin.com/in/abirabdullah", icon: Linkedin, color: "hover:text-blue-600" },
  { name: "Twitter", href: "https://twitter.com/abirabdullah", icon: Twitter, color: "hover:text-sky-500" },
  { name: "Email", href: "mailto:abirabdullah3491@gmail.com", icon: Mail, color: "hover:text-red-500" },
];

// Contact Methods
const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "abirabdullah3491@gmail.com",
    action: () => window.open("mailto:abirabdullah3491@gmail.com"),
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+8801406751374",
    action: () => window.open("tel:+8801406751374"),
    color: "from-green-500 to-green-600",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Gazipur, Dhaka, Bangladesh",
    action: () => window.open("https://maps.google.com/?q=Dhaka+Bangladesh"),
    color: "from-red-500 to-red-600",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "Usually within 24 hours",
    color: "from-purple-500 to-purple-600",
  },
];

// vCard download
function downloadVCard() {
  const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:Abir Hossen Abdullah\nTEL:+8801406751374\nEMAIL:abirabdullah3491@gmail.com\nADR:Gazipur, Dhaka, Bangladesh\nURL:https://abirabdullah.web.app\nEND:VCARD`;
  const blob = new Blob([vCard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "AbirAbdullah.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Contact() {
  const pageMeta = {
    title: 'Contact — Abir Hossen Abdullah',
    description: 'Get in touch with Abir Hossen Abdullah — hire, collaborate, or send a message. Fast response guaranteed.',
    url: 'https://abirabdullah.web.app/contact'
  };

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        timestamp: serverTimestamp(),
      });
      setSuccess("✅ Message sent successfully! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error("Error:", err);
      setError("❌ Failed to send message. Please try again or contact me directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-gray-100 via-white dark:to-gray-100 py-16 px-4">
      <SEO title={pageMeta.title} description={pageMeta.description} url={pageMeta.url} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-400 dark:text-gray-600 text-lg max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hello? Feel free to reach out. I'm always excited to connect with new people and explore opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${method.color} rounded-xl p-6 text-white shadow-xl cursor-pointer transition-all transform hover:shadow-2xl`}
                onClick={method.action}
              >
                <Icon size={32} className="mb-4" />
                <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                <p className="text-white/80">{method.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 dark:from-white/50 dark:to-gray-100/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700 dark:border-gray-300"
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="text-blue-400 dark:text-blue-600" size={28} />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600">
                Send a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 dark:text-gray-800 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 dark:border-gray-400 bg-gray-900 dark:bg-white text-white dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 dark:text-gray-800 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 dark:border-gray-400 bg-gray-900 dark:bg-white text-white dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 dark:text-gray-800 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="Project inquiry, Collaboration, etc."
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 dark:border-gray-400 bg-gray-900 dark:bg-white text-white dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 dark:text-gray-800 mb-2">
                  Message *
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project, idea, or just say hello!"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 dark:border-gray-400 bg-gray-900 dark:bg-white text-white dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Status Messages */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-900/50 border border-green-600 rounded-lg text-green-300"
                >
                  <CheckCircle size={20} />
                  {success}
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-300"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Quick Info Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 dark:from-white/50 dark:to-gray-100/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700 dark:border-gray-300">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 dark:from-green-600 dark:to-blue-600 mb-6">
                Quick Info
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-400 dark:text-gray-600 mb-2 uppercase tracking-wide">Response Time</p>
                  <p className="text-white dark:text-gray-900 font-medium">Usually within 24 hours</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 dark:text-gray-600 mb-2 uppercase tracking-wide">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-900/50 dark:bg-blue-100 text-blue-300 dark:text-blue-800 rounded-full text-xs font-medium">Web Projects</span>
                    <span className="px-3 py-1 bg-green-900/50 dark:bg-green-100 text-green-300 dark:text-green-800 rounded-full text-xs font-medium">Teaching</span>
                    <span className="px-3 py-1 bg-purple-900/50 dark:bg-purple-100 text-purple-300 dark:text-purple-800 rounded-full text-xs font-medium">Collaboration</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 dark:text-gray-600 mb-4 uppercase tracking-wide">Connect On Social</p>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-3 bg-gray-700/50 dark:bg-gray-300 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-200 transition-all ${link.color}`}
                        >
                          <Icon size={24} />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Download vCard */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadVCard}
              className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              📥 Download My vCard
            </motion.button>

            {/* Availability Info */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 dark:from-blue-100/30 dark:to-purple-100/30 rounded-2xl p-6 border border-blue-700 dark:border-blue-300">
              <h4 className="font-bold text-blue-300 dark:text-blue-700 mb-2">📅 Currently Available For</h4>
              <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-700">
                <li>✓ Freelance Web Development Projects</li>
                <li>✓ Mentoring & Teaching</li>
                <li>✓ Technical Consultation</li>
                <li>✓ Collaboration & Partnerships</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
