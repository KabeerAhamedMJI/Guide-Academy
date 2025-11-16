import Link from "next/link";
import Image from "next/image";
import Logo from "../Header/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { headerData } from "../Header/Navigation/menuData";

const Footer = () => {
  return (
    <footer className="bg-blue-50 py-12 text-slate-700 border-t border-blue-100">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          
          {/* LOGO + SOCIAL */}
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <Logo />
            <div className="flex items-center gap-5 mt-6">
              {[
                "tabler:brand-facebook",
                "tabler:brand-twitter",
                "tabler:brand-instagram",
              ].map((icon, i) => (
                <Link
                  href="#"
                  key={i}
                  className="hover:text-primary text-slate-500 text-2xl transition-all duration-300 hover:scale-110"
                >
                  <Icon icon={icon} />
                </Link>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Links</h3>
            <ul className="space-y-2 text-sm">
              {headerData.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OTHER */}
          <div className="col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Other</h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "Our Team", "Career", "Services", "Contact"].map(
                (text, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-slate-600 hover:text-primary transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4 space-y-6">
            <div className="flex items-start gap-3">
              <Icon
                icon="tabler:brand-google-maps"
                className="text-primary text-2xl mt-1"
              />
              <p className="text-sm text-slate-600 leading-relaxed">
                City Center, Manjeri, Malappuram, Kerala 676122
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="tabler:phone" className="text-primary text-2xl" />
              <p className="text-sm text-slate-600">+91 6238 318 512</p>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="tabler:mail" className="text-primary text-2xl" />
              <p className="text-sm text-slate-600">info@guideacademy.in</p>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-blue-100 pt-6 flex flex-col lg:flex-row items-center justify-between">
          <p className="text-slate-500 text-xs text-center lg:text-left">
            &copy; {new Date().getFullYear()} All rights reserved. Developed by{" "}
            <Link
              href="https://wa.me/9747436459"
              target="_blank"
              className="text-primary font-medium hover:underline"
            >
              Kabeer Ahamed
            </Link>
          </p>
          <div className="flex gap-5 mt-4 lg:mt-0">
            <Link
              href="/"
              className="text-slate-600 text-xs hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-slate-600 text-xs hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
