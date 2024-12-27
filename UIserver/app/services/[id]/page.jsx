import React from 'react';
import OCIApplicationForm from '../../../components/OCIApplicationForm';

export const metadata = {
  title: "Services - BLS International Services Canada | Reliable Indian Consulate Application Assistance",
  description:
    "Explore our range of services at BLS International Services Canada. From Passport Renewal to OCI Application, we provide seamless assistance for Indian consulate applications.",
  keywords: [
    "BLS services Canada",
    "Indian consulate applications",
    "OCI application services",
    "passport renewal Canada",
    "visa and consulate support"
  ],

  openGraph: {
    title: "Services - BLS International Services Canada",
    description:
      "Discover BLS International Services Canada's trusted support for Indian consulate applications. We make your passport, visa, and OCI services hassle-free.",
    url: `${process.env.NEXT_PUBLIC_PROD_URL}/services`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PROD_URL}/_next/static/media/services.abc123.png`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Services - BLS International Services Canada",
    description:
      "BLS International Services Canada provides efficient services for Indian consulate applications, including Passport Renewal and OCI Application.",
    images: [`${process.env.NEXT_PUBLIC_PROD_URL}/images/default-twitter-image.jpg`],
  },

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PROD_URL}/services`,
  },

  robots: {
    index: true,
    follow: true,
  },

  additionalMetaTags: [
    {
      name: "author",
      content: "BLS International Services Canada",
    },
    {
      name: "publisher",
      content: "BLS International Services Canada",
    },
  ],

  other: {
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "BLS International Services Canada",
      serviceType: "Indian consulate application services",
      provider: {
        "@type": "Organization",
        name: "BLS International Services Canada",
        url: `${process.env.NEXT_PUBLIC_PROD_URL}`,
      },
      description:
        "We offer efficient and reliable services for Indian consulate applications in Canada, ensuring a seamless process for our clients.",
      areaServed: {
        "@type": "Country",
        name: "Canada",
      },
    },
  },
};

const ServicePage = async ({ params }) => {
  const { id } = await params;  
  return (
    <OCIApplicationForm serviceId={id} />
  );
};

export default ServicePage;

export const generateStaticParams = async () => {
  return [
    { id: "PCC" },
    { id: "Passport-Renewal-Adult" },
    { id: "Passport-Renewal-Minor" },
    { id: "Passport-Surrender" },
    { id: "OCI-Adult-Indian-Origin" },
    { id: "OCI-Minor-Indian-Origin" }
  ];
};
