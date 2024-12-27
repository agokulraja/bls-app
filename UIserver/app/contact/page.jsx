import ContactPage from '@/components/ContactUs';
import React from 'react';
export const metadata = {
    title: "Contact Us - BLS International Services Canada | Indian Consulate Assistance",
    description: "Get in touch with BLS International Services Canada for assistance with Indian consulate applications. Our team in Toronto is ready to help make your application process smooth and easy.",
    keywords: [
      "contact BLS International Services Canada",
      "Indian consulate support",
      "Indian embassy assistance",
      "embassy application contact",
      "Canada Indian consulate services"
    ],
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_PROD_URL}/contact`,
      title: "Contact Us - BLS International Services Canada | Indian Consulate Assistance",
      description: "Get in touch with BLS International Services Canada for assistance with Indian consulate applications. Our team in Toronto is ready to help make your application process smooth and easy.",
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_PROD_URL}/_next/static/media/pickandDropOff.0c45a1f2.png`,
        },
      ],
    },
    additionalMetaTags: [
        {
          name: "author",
          content: "BLS International Services Canada"
        },
        {
          name: "publisher",
          content: "BLS International Services Canada"
        }
      ],
    other: {
      "schema.org": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "BLS International Services Canada",
        url: process.env.NEXT_PUBLIC_PROD_URL,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          contactOption: "TollFree",
          areaServed: "CA",
          availableLanguage: ["English"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Visa Street",
          addressLocality: "Toronto",
          addressRegion: "ON",
          postalCode: "M5V 2T6",
          addressCountry: "CA",
        },
        email: "info@blsindia.ca",
      },
    },
  };
  
function page() {
    return (
        <div>
           <ContactPage/>
        </div>
    );
}

export default page;
