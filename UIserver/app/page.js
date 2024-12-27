"use client";
import Card from "@/components/Card";
import TabbedInterface from "@/components/FeaturesSection";
import HomePageCards from "@/components/HomepageCards";
import SeoLinkBlock from "@/components/seoLinkBlock";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Settings } from 'lucide-react'
const defaultMetadata = {
  metaTitle: "BLS International Services Canada - Your Trusted Partner for Indian Consulate Services",
  metaDescription: "BLS International Services Canada helps make the application process for the Indian consulate easy and efficient. Our team ensures a smooth experience with accurate and timely submissions for all your embassy-related needs.",
  metaKeywords: [
    "Indian consulate services",
    "BLS International Services Canada",
    "Indian embassy assistance",
    "embassy application support",
    "Canada Indian consulate help"
  ],
  ogUrl: `${process.env.NEXT_PUBLIC_PROD_URL}`,
  ogImage: `${process.env.NEXT_PUBLIC_PROD_URL}/_next/static/media/pickandDropOff.0c45a1f2.png`,
  twitterImage: `${process.env.NEXT_PUBLIC_PROD_URL}/images/default-twitter-image.jpg`,
  canonicalUrl: `${process.env.NEXT_PUBLIC_PROD_URL}`,
  robots: "index, follow",
  author: "BLS International Services Canada",
  publisher: "BLS International Services Canada",
  schema: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BLS International Services Canada",
    "url": `${process.env.NEXT_PUBLIC_PROD_URL}`,
    "logo": `${process.env.NEXT_PUBLIC_PROD_URL}/images/logo.jpg`,
    "sameAs": [
      "https://www.facebook.com/BLSInternationalServicesCanada",
      "https://www.linkedin.com/company/bls-international-services-canada",
      "https://twitter.com/BLSIntlCanada"
    ],
    "description": "BLS International Services Canada specializes in providing services related to the Indian consulate, helping make the application process simple and efficient.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": "CA",
      "availableLanguage": ["English"]
    }
  }
};

export default function Component() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{defaultMetadata.metaTitle}</title>
        <meta name="description" content={defaultMetadata.metaDescription} />
        <meta name="keywords" content={defaultMetadata.metaKeywords.join(", ")} />
        <meta property="og:title" content={defaultMetadata.metaTitle} />
        <meta property="og:description" content={defaultMetadata.metaDescription} />
        <meta property="og:url" content={defaultMetadata.ogUrl} />
        <meta property="og:image" content={defaultMetadata.ogImage} />
        <meta name="twitter:image" content={defaultMetadata.twitterImage} />
        <link rel="canonical" href={defaultMetadata.canonicalUrl} />
        <meta name="robots" content={defaultMetadata.robots} />
        <meta name="author" content={defaultMetadata.author} />
        <meta name="publisher" content={defaultMetadata.publisher} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(defaultMetadata.schema),
          }}
        />
      </Helmet>
<>
<div className="flex items-center justify-center min-h-[40vh] px-4">
        <main className="w-full max-w-6xl mx-auto my">
          <section className="text-center">
            <h1 className="mb-8 mt-10 text-3xl md:text-4xl font-semibold text-[#ba6427] leading-snug text-center ">
              Welcome to BLS India Visa and Consular Services
            </h1>
            <HomePageCards/>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed animate-slide-in">
              Filling out applications for the Indian consulate can be a challenging task for many individuals. A lack of knowledge on how to begin the process often leads to confusion, while mistakes in the application form can further complicate matters. Recognizing these common hurdles, we offer assistance to ensure that your applications are completed efficiently and accurately, all from the comfort of your home. Our team is dedicated to guiding you through each step, providing support and expertise to help you navigate the process with ease. Whether you are applying for a visa, passport, or other consular services, we are here to simplify the experience and ensure that your application is submitted correctly and promptly. Let us help you make the consulate application process a seamless endeavor.
            </p>
          </section>
        </main>
      </div>
   
</>
     

      <Card />
      <SeoLinkBlock/>
    </HelmetProvider>
  );
}
