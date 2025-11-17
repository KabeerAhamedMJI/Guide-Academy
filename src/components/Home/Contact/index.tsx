"use client";

export const getImagePrefix = () => "/";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const Contact = () => {
  const isProd = process.env.NODE_ENV === "production";
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ ok: false, text: "Please fill all required fields." });
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus({ ok: true, text: "Thanks — your message was sent successfully!" });
      setForm({ name: "", email: "", topic: "", message: "" });
    } catch {
      setStatus({ ok: false, text: "Something went wrong. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24 bg-[#faf9f7]">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-lg px-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100`}
        >
          {/* LEFT SIDE */}
          <div className="md:col-span-5 p-10 lg:p-14 bg-gradient-to-b from-white to-[#fbfbfc]">
            <h3 className="text-2xl font-semibold text-[#0f0f2a] mb-8">Get in Touch</h3>

            <div className="space-y-6">
              {/* LOCATION */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111827]">Address</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Guide Academy, City Center, Manjeri, Malappuram, Kerala: 676122
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111827]">Email</p>
                  <p className="text-sm text-gray-500">info@guideacademy.in</p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111827]">Phone</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    +91 6238 318 512 <br /> +91 9747 436 459
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                We aim to respond within <strong>6–12 hours</strong>. For quick support, call us directly.
              </p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden md:block md:col-span-1 border-l border-gray-100" />

          {/* RIGHT SIDE - FORM */}
          <div className="md:col-span-6 p-8 lg:p-12">
            <h3 className="text-2xl font-semibold text-[#0f0f2a] mb-6">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Your name*</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Your Email*</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Select an Issue</label>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Choose...</option>
                  <option value="admissions">Admissions</option>
                  <option value="courses">Courses</option>
                  <option value="support">Support</option>
                  <option value="general">General</option>
                   <option value="general">Certificate</option>
                   <option value="general">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Message*</label>
                <textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Write your message..."
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 transition-all duration-150 shadow-md"
                >
                  {loading ? "Submitting..." : "Submit"}
                  <Send className="w-5 h-5" />
                </button>

                {status && (
                  <p className={`mt-3 text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>
                    {status.text}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
