"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const admissionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => setSticky(window.scrollY >= 80);

  const handleClickOutside = (event: MouseEvent) => {
    // close mobile menu when clicking outside it
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }

    // close admission modal when clicking outside it
    if (
      admissionRef.current &&
      !admissionRef.current.contains(event.target as Node) &&
      isAdmissionOpen
    ) {
      setIsAdmissionOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isAdmissionOpen]);

  // lock body scroll ONLY when mobile navbar is open
  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navbarOpen]);

  // open admission modal from other places
  useEffect(() => {
    const open = (_e: Event) => setIsAdmissionOpen(true);
    window.addEventListener("open-header-form", open);
    return () => window.removeEventListener("open-header-form", open);
  }, []);

  // When admission opens, scroll into view and focus first field
  useEffect(() => {
    if (!isAdmissionOpen) return;
    const t = setTimeout(() => {
      const el = admissionRef.current;
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      const first = el?.querySelector<HTMLElement>("#fullName");
      first?.focus({ preventScroll: true });
    }, 50);
    return () => clearTimeout(t);
  }, [isAdmissionOpen]);

  // ==== Admission Form data & handlers ====
  const TARGET_WHATSAPP = "919072930247";

  const [form, setForm] = useState({
    fullName: "",
    whatsappNo: "",
    course: "Select",
    qualification: "",
    date: "",
    address: "",
    pinCode: "",
    district: "Select",
  });

  const onlyDigits = (v: string) => v.replace(/\D/g, "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id === "whatsappNo" || id === "pinCode")
      setForm((f) => ({ ...f, [id]: onlyDigits(value) }));
    else setForm((f) => ({ ...f, [id]: value }));
  };

  useEffect(() => {
    if (isAdmissionOpen) {
      const today = new Date();
      const formatted = today.toISOString().split("T")[0];
      setForm((f) => ({ ...f, date: formatted }));
    }
  }, [isAdmissionOpen]);

  const courses = [
    { name: "Montessori TTC", courseFee: "20,000", admissionFee: "7,500" },
    { name: "Pre-Primary TTC", courseFee: "12,000", admissionFee: "5,000" },
    { name: "Arabic TTC", courseFee: "10,000", admissionFee: "5,000" },
    { name: "Hindi TTC", courseFee: "15,000", admissionFee: "5,000" },
    { name: "Diploma in Fashion Designing", courseFee: "4,000", admissionFee: "4,000" },
    { name: "Diploma in Beautician", courseFee: "3,500", admissionFee: "3,500" },
    { name: "Diploma in counselling psychology", courseFee: "1,000", admissionFee: "1,000" },
    { name: "Pharmacy Sales Assistant", courseFee: "9,000", admissionFee: "4,500" },
    { name: "Hospital Administration", courseFee: "20,500", admissionFee: "5,000" },
    { name: "Accounting", courseFee: "13,000", admissionFee: "5,000" },
    { name: "Degree", courseFee: "16,000", admissionFee: "4,500" },
    { name: "PG", courseFee: "16,000", admissionFee: "4,500" },
    { name: "SSLC (NIOS)", courseFee: "11,000", admissionFee: "2,500" },
    { name: "Plus Two (NIOS)", courseFee: "11,000", admissionFee: "2,500" },
    { name: "Plus Two (Jamia)", courseFee: "19,500", admissionFee: "19,500" },
    { name: "Spoken English", courseFee: "1,500", admissionFee: "1,500" },
    { name: "Jewellery Making", courseFee: "2,000", admissionFee: "2,000" },
    { name: "Bridal Makeup", courseFee: "3,500", admissionFee: "3,500" },
    { name: "Diploma in Acupuncture", courseFee: "", admissionFee: "" },
    { name: "Stitching Course", courseFee: "1,000", admissionFee: "1,000" },
    { name: "Home Tuition", courseFee: "3,500", admissionFee: "3,500" },
    { name: "Abacus", courseFee: "6,900", admissionFee: "6,900" },
  ];

  const districts = [
    "Thiruvananthapuram","Kollam","Pathanamthitta","Alappuzha","Kottayam","Idukki",
    "Ernakulam","Thrissur","Palakkad","Malappuram","Kozhikode","Wayanad","Kannur","Kasaragod"
  ];

  const selectedCourse = courses.find((c) => c.name === form.course);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullName, district, course, whatsappNo, qualification, date, address, pinCode } = form;

    if (
      !fullName ||
      !district ||
      !course ||
      !whatsappNo ||
      !qualification ||
      !date ||
      !address ||
      !pinCode
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const selected = courses.find((c) => c.name === course);
    if (!selected) {
      alert("Selected course not found in the list.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const text =
      `*_Guide Academy Admission Form ${currentYear}_*\n\n` +
      `Full Name: ${fullName}\n` +
      `Address: ${address}\n` +
      `Pin Code: ${pinCode}\n` +
      `District: ${district}\n` +
      `Course: ${course}\n` +
      `Whatsapp No: ${whatsappNo}\n` +
      `Qualification: ${qualification}\n` +
      `Date: ${date}\n` +
      `Course Fee: ${selected.courseFee}\n` +
      `Admission Fee: ${selected.admissionFee}`;

    const url = `https://wa.me/${TARGET_WHATSAPP}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <header
      className={`fixed top-0 z-40 w-full pb-5 transition-all duration-300 bg-white ${
        sticky ? "shadow-lg py-5" : "shadow-none py-6"
      }`}
    >
      <div className="lg:py-0 py-2">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
          <Logo />
          <nav className="hidden lg:flex flex-grow items-center gap-8 justify-center">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAdmissionOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 py-2 text-sm font-semibold shadow hover:bg-secondary transition"
            >
              <Icon className="text-base sm:text-lg" icon="solar:document-add-broken" />
              <span>Admission Form</span>
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-primary"></span>
              <span className="block w-6 h-0.5 bg-primary mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-primary mt-1.5"></span>
            </button>
          </div>
        </div>

        {/* ===== Mobile overlay + drawer (solid white) ===== */}
        {navbarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setNavbarOpen(false)}
            aria-hidden="true"
          />
        )}

        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!navbarOpen}
        >
          <div
            className="h-full w-[320px] max-w-xs shadow-2xl overflow-auto"
            style={{ backgroundColor: "#ffffff" }} // force opaque white
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Logo />
              <button
                onClick={() => setNavbarOpen(false)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Icon icon="tabler:x" className="text-2xl" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {headerData.map((item, index) => (
                <MobileHeaderLink key={index} item={item} />
              ))}
            </nav>
          </div>
        </div>

        {/* ===== Admission Modal (top-most) ===== */}
        {isAdmissionOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-start md:items-center justify-center p-4 overflow-y-auto"
          >
            {/* backdrop for modal */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div
              id="header-form"
              ref={admissionRef}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              {/* header bar */}
              <div className="relative bg-primary px-6 py-4">
                <h3 className="text-white text-xl md:text-2xl font-semibold flex items-center gap-2">
                  <Icon icon="solar:document-add-broken" className="text-2xl" />
                  Take Admission
                </h3>
                <button
                  onClick={() => setIsAdmissionOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white transition"
                >
                  <Icon icon="tabler:x" className="text-2xl" />
                </button>
              </div>

              <div className="p-6">
                {/* course/admission fee pills */}
                {selectedCourse && selectedCourse.name !== "Select" && (
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="text-sm px-4 py-1.5 rounded-full bg-primary text-white font-medium shadow-[0_2px_6px_rgba(24,87,134,0.3)] border border-primary/20">
                      Course Fee: ₹{selectedCourse.courseFee || "—"}
                    </span>
                    <span className="text-sm px-4 py-1.5 rounded-full bg-white text-accent font-medium shadow-[0_2px_6px_rgba(255,193,7,0.15)] border border-accent/30">
                      Admission Fee: ₹{selectedCourse.admissionFee || "—"}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <Icon icon="solar:user-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={form.fullName}
                        onChange={onChange}
                        className="w-full border rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                      />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label htmlFor="whatsappNo" className="block text-sm font-medium mb-1">
                      Contact No (WhatsApp)
                    </label>
                    <div className="relative">
                      <Icon icon="ic:baseline-whatsapp" className="absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="whatsappNo"
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        required
                        placeholder="10-digit number"
                        value={form.whatsappNo}
                        onChange={onChange}
                        className="w-full border rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Course */}
                  <div>
                    <label htmlFor="course" className="block text-sm font-medium mb-1">
                      Course
                    </label>
                    <div className="relative">
                      <Icon icon="solar:book-2-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <select
                        id="course"
                        required
                        value={form.course}
                        onChange={onChange}
                        className="w-full border rounded-xl pl-10 pr-10 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                      >
                        <option value="Select">Select</option>
                        {courses.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Qualification */}
                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium mb-1">
                      Qualification
                    </label>
                    <div className="relative">
                      <Icon icon="solar:certificate-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        id="qualification"
                        type="text"
                        required
                        placeholder="e.g., SSLC, +2, Degree"
                        value={form.qualification}
                        onChange={onChange}
                        className="w-full border rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <Icon icon="solar:calendar-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        id="date"
                        type="date"
                        required
                        value={form.date}
                        disabled
                        className="w-full border rounded-xl pl-10 pr-3 py-2.5 bg-gray-100 cursor-not-allowed shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <Icon icon="solar:home-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        id="address"
                        type="text"
                        required
                        placeholder="House/Street, City"
                        value={form.address}
                        onChange={onChange}
                        className="w-full border rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Pin Code */}
                  <div>
                    <label htmlFor="pinCode" className="block text-sm font-medium mb-1">
                      Pin Code
                    </label>
                    <div className="relative">
                      <Icon icon="solar:location-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        id="pinCode"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        placeholder="6-digit Pin Code"
                        value={form.pinCode}
                        onChange={onChange}
                        className="w-full border rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                      />
                    </div>
                  </div>

                  {/* District */}
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium mb-1">
                      District
                    </label>
                    <div className="relative">
                      <Icon icon="solar:map-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <select
                        id="district"
                        required
                        value={form.district}
                        onChange={onChange}
                        className="w-full border rounded-xl pl-10 pr-10 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                      >
                        <option value="Select">Select</option>
                        {districts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="md:col-span-3 mt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-midnight_text/70">
                      By submitting, details will open in WhatsApp chat.
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                    >
                      <Icon icon="mdi:send" className="text-lg" />
                      Submit &amp; Send via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* ===== end admission modal ===== */}
      </div>
    </header>
  );
};

export default Header;
