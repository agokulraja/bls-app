"use client"
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'; // Make sure you import the icons

const footerData = {
  about: {
    title: 'About BLS India',
    description: 'BLS India provides efficient visa and consular services for Indian missions worldwide.',
  },
  quickLinks: {
    title: 'Quick Links',
    links: [
      // { name: 'FAQs', url: '/faqs' },
      { name: 'Privacy Policy', url: '/privacy-policy' },
      { name: 'Terms and Conditions', url: '/terms-of-service' },
      { name: 'Form Filling Services', url: '/form-fillling-services' },
    ],
  },
  contact: {
    title: 'Contact Us',
    phone: '+1 289-201-2094',
    email: 'info@blsindia-canada.ca',
  },
  socialLinks: {
    title: 'Follow Us',
    icons: [
      { component: Facebook, href: '#' },
      { component: Twitter, href: '#' },
      { component: Linkedin, href: '#' },
      { component: Instagram, href: '#' },
    ],
  },
  copyright: '© 2024 BLS International Group. All rights reserved.',
};
const menuLinks = [
  { href: "/passport", label: "Passport" },
  { href: "https://blogs.blsindia-canada.ca/oci", label: "OCI" },
  { href: "/visa", label: "Visa" },
  { href: "/services", label: "Services" },
  { href: "https://blogs.blsindia-canada.ca", label: "Blog" },
  { href: "/aboutus", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/pickup-instructions", label: "Pickup Services" },
];
function Fotter() {
  return (
    <footer className="max-w-screen-xl py-8 mt-12 text-white">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{footerData.about.title}</h3>
            <p className="text-sm">{footerData.about.description}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{footerData.quickLinks.title}</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-sm transition-colors hover:text-red-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {menuLinks.map((menuLink, index) => (
                <li key={index}>
                  <a href={menuLink.href} className="text-sm transition-colors hover:text-red-200">
                    {menuLink.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{footerData.contact.title}</h3>
            <address className="text-sm not-italic">
              <p className="mt-2">Phone: {footerData.contact.phone}</p>
              <p>Email: {footerData.contact.email}</p>
            </address>
          </div>
        
          {/* <div>
            <h3 className="mb-4 text-lg font-semibold">{footerData.socialLinks.title}</h3>
            <div className="flex space-x-4">
              {footerData.socialLinks.icons.map((icon, index) => (
                <a key={index} href={icon.href} className="transition-colors hover:text-red-200">
                  <icon.component size={24} />
                </a>
              ))}
            </div>
          </div> */}
        </div>

      </div>
    </footer>
  );
}

export default Fotter;
