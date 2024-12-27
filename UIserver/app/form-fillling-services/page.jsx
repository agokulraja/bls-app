

import CalendlyWidget from '@/components/Calanderly';
import React from 'react';

export const metadata = {
    title: "Schedule Appointments with Ease - BLS International Services",
    description:
      "Use our convenient online Calendly scheduling widget to book appointments for Indian consulate services. Streamline your application process with BLS International Services.",
    keywords: [
      "Calendly scheduling",
      "Indian consulate appointment",
      "BLS International Services booking",
      "appointment scheduling widget",
      "easy online booking",
    ],
  
    openGraph: {
      title: "Schedule Appointments with Ease - BLS International Services",
      description:
        "Book your Indian consulate service appointments with our user-friendly Calendly widget. BLS International ensures a seamless and efficient booking process.",
      url: `${process.env.NEXT_PUBLIC_PROD_URL}/appointments`,
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_PROD_URL}/images/appointment-scheduling.jpg`,
        },
      ],
    },
  
    twitter: {
      card: "summary_large_image",
      title: "Schedule Appointments with Ease - BLS International Services",
      description:
        "Easily schedule your Indian consulate appointments online with BLS International's Calendly widget.",
      images: [`${process.env.NEXT_PUBLIC_PROD_URL}/images/default-twitter-image.jpg`],
    },
  
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PROD_URL}/appointments`,
    },
  
    robots: {
      index: true,
      follow: true,
    },
  
    additionalMetaTags: [
      {
        name: "author",
        content: "BLS International Services",
      },
      {
        name: "publisher",
        content: "BLS International Services",
      },
    ],
  
    other: {
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Appointment Scheduling",
        serviceType: "Online appointment booking for Indian consulate services",
        provider: {
          "@type": "Organization",
          name: "BLS International Services",
          url: `${process.env.NEXT_PUBLIC_PROD_URL}`,
        },
        description:
          "BLS International offers a Calendly widget to simplify the process of scheduling appointments for Indian consulate services.",
      },
    },
  };
  
function page() {
    return (
        <div>
            <CalendlyWidget/>
        </div>
    );
}

export default page;


