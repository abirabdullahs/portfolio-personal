import React, { useState } from "react";
import { app } from "../../firebase";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(app);

// Social Links
const socialLinks = [
  { name: "GitHub", href: "https://github.com/abirabdullahofficial", icon: <i className="fab fa-github text-xl" /> },
  { name: "LinkedIn", href: "https://linkedin.com/in/abirabdullah", icon: <i className="fab fa-linkedin text-xl text-blue-600" /> },
  { name: "Twitter", href: "https://twitter.com/abirabdullah", icon: <i className="fab fa-twitter text-xl text-sky-500" /> },
  { name: "Medium", href: "https://medium.com/@abirabdullah", icon: <i className="fab fa-medium text-xl text-green-600" /> },
  { name: "YouTube", href: "https://youtube.com/@abirabdullah", icon: <i className="fab fa-youtube text-xl text-red-600" /> },
];

// Contact Details
const contactDetails = [
  {
    label: "Phone",
    value: "+8801234567890",
    action: () => window.open("tel:+8801234567890"),
    icon: <i className="fas fa-phone text-blue-600" />,
    button: "Call",
  },
  {
    label: "Email",
    value: "abirabdullah@gmail.com",
    action: () => window.open("mailto:abirabdullah@gmail.com"),
    icon: <i className="fas fa-envelope text-green-600" />,
    button: "Email",
  },
  {
    label: "Location",
    value: "Dhaka, Bangladesh",
    action: () => window.open("https://maps.google.com/?q=Dhaka+Bangladesh"),
    icon: <i className="fas fa-map-marker-alt text-red-600" />,
    button: "Map",
  },
];

// vCard download
function downloadVCard() {
  const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:Abir Abdullah\nTEL:+8801234567890\nEMAIL:abirabdullah@gmail.com\nADR:Dhaka, Bangladesh\nEND:VCARD`;
  const blob = new Blob([vCard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "AbirAbdullah.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        timestamp: serverTimestamp(),
      });
      setSuccess("✅ Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("❌ Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4 font-[Quicksand,Poppins,sans-serif]">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg p-8 flex flex-col gap-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Contact Me</h2>
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            required
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:scale-105 transition-all"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </form>

        {/* Contact Details + Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Contact Details */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-4 border">
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">My Contact Details</h3>
            {contactDetails.map(detail => (
              <div key={detail.label} className="flex items-center gap-3">
                {detail.icon}
                <span className="font-semibold">{detail.label}:</span>
                <span>{detail.value}</span>
                <button
                  onClick={detail.action}
                  className="ml-2 px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-xs"
                >
                  {detail.button}
                </button>
              </div>
            ))}
            <button
              onClick={downloadVCard}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 text-sm"
            >
              Download vCard
            </button>
          </div>

          {/* Social Links */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-4 border">
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">Social Links</h3>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 rounded-lg shadow hover:scale-105 transition-all"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
