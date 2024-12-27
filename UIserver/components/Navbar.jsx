'use client'

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuth0 } from '@auth0/auth0-react'
import Login from "./LoginButton";

function Navbar() {
  const menuLinks = [
    { href: "/passport", label: "Passport" },
    { href: "https://blogs.blsindia-canada.ca/oci", label: "OCI" },
    { href: "/visa", label: "Visa" },
    // { href: "https://blogs.blsindia-canada.ca/services", label: "Services" },
    // { href: "https://blogs.blsindia-canada.ca", label: "Blog" },
    { href: "/services", label: "Services" },
    // { href: "/track", label: "Track My Order" },
    { href: "/aboutus", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/pickup-instructions", label: "Pickup Services" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  return (
    <header className="sticky top-0 z-50 w-full max-w-screen-xl text-white ">
      <div className="container flex items-center justify-between px-2 py-2 mx-auto">
        <div className="flex items-center space-x-2">
        <Link href="/" passHref>
            <Image
              src={`https://res.cloudinary.com/dh8lem2fe/image/upload/v1730923835/images/btboul1xutmdzsopv0ou.avif`}
              alt="BLS Logo"
              width={100}
              height={100}
              className="h-full rounded-full max-md:w-16 max-md:h-16"
            />
        </Link>
        </div>
        <nav className="justify-around hidden w-2/3 space-x-4 md:flex">
          {menuLinks.map((link) => (
            <Link
              key={link.label}
              className="transition-colors hover:text-[#00FFFF] hover:underline decoration-[#00FFFF] underline-offset-4"

              href={link.href}
            >
              {link.label}
            </Link>
            
          ))}
          {/* <Login/> */}
          <div className="text-center text-sm flex items-center justify-center flex-col">
  <div className="flex items-center">
    <img 
      src="/pngs/telephoneBlue.png" 
      alt="Call Icon" 
      className="h-4 w-4 mr-2" 
    />
    <a href="tel:+12892012094" className="text-white">
      289-201-2094
    </a>
  </div>
  <span className="text-white mt-1">Call us for Courier enquiry:</span>
</div>
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
     
      {isMenuOpen && (
        <div className="absolute w-full py-2 bg-red-900 md:hidden">
          <nav className="flex flex-col items-center space-y-2">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                className="py-2 transition-colors hover:text-red-200"
                href={link.href}
              >
                {link.label}
              </Link>
              
            ))}
               <div className="text-center text-sm flex items-center justify-center flex-col">
  <div className="flex items-center">
    <img 
      src="/pngs/telephoneBlue.png" 
      alt="Call Icon" 
      className="h-4 w-4 mr-2" 
    />
    <a href="tel:+12892012094" className="text-white">
      289-201-2094
    </a>
  </div>
  <span className="text-white mt-1">Call us for courier enquiry:</span>
</div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
