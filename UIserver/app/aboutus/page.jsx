import MetaData from '@/components/MetaData';
import Image from 'next/image';
export const metadata = {
  title: "About Us - BLS International Services Canada | Trusted Partner for Indian Consulate Services",
  description: "Learn more about BLS International Services Canada. We specialize in providing reliable and efficient services for Indian consulate applications, making your embassy experience seamless.",
  keywords: ["about BLS International Services Canada", "Indian consulate services", "Indian embassy support", "embassy application services", "Canadian consulate assistance"],
  
  openGraph: {
    title: "About Us - BLS International Services Canada | Trusted Partner for Indian Consulate Services",
    description: "Learn more about BLS International Services Canada. We specialize in providing reliable and efficient services for Indian consulate applications, making your embassy experience seamless.",
    url: `${process.env.NEXT_PUBLIC_PROD_URL}/about`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PROD_URL}/_next/static/media/pickandDropOff.0c45a1f2.png`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us - BLS International Services Canada | Trusted Partner for Indian Consulate Services",
    description: "Learn more about BLS International Services Canada. We specialize in providing reliable and efficient services for Indian consulate applications, making your embassy experience seamless.",
    images: [`${process.env.NEXT_PUBLIC_PROD_URL}/images/default-twitter-image.jpg`],
  },

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PROD_URL}/about`
  },

  robots: {
    index: true,
    follow: true
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
    // JSON-LD Schema Data
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "BLS International Services Canada",
      url: `${process.env.NEXT_PUBLIC_PROD_URL}`,
      description: "BLS International Services Canada provides reliable services for individuals and businesses applying to the Indian consulate, ensuring a smooth and efficient experience.",
      sameAs: [
        "https://www.facebook.com/BLSInternationalServicesCanada",
        "https://www.linkedin.com/company/bls-international-services-canada",
        "https://twitter.com/BLSIntlCanada"
      ]
    }
  }
};

export default function Component() {
 

  return (
    <>
      <div className="container flex flex-col justify-center items-center px-4 py-16 mx-auto space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        
        {/* Left Flag */}
        <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48">
          <Image
            src="/indian-flag.avif"
            alt="Indian Flag Left"
            width={192}
            height={192}
          />
        </div>

        {/* Mission Section */}
        <div className="text-center md:text-center md:max-w-2xl">
          <h2 className="mb-6 text-5xl font-bold">About Us</h2>
          <p className="text-gray-800 text-md animate-slide-in block">
            
            Our mission is to support the Indian community in Canada by assisting with Indian embassy-related documentation. Many individuals face difficulties when submitting their documents, and we are here to provide a solution. Our goal is to offer an authentic, high-end lounge experience from the comfort of your own home, helping with everything from filling out forms to couriering documents. As the first company to offer this service online, we aim to help the community without the need for agents who charge exorbitant fees. We are a legitimate business, registered in Nova Scotia.
            <br/>
            <br/>
            Although we are not affiliated with BLS International Services INC., we pride ourselves on being more transparent and trustworthy than them. You will only pay the official fees listed on the consulate's website, which are not exactly the same but are below them. Yes, you read that correctly: "lower fees" specifically applies to courier charges. Our promise is to provide professional services at fair and legal charges, so that people's hard-earned money is preserved.
            </p>
        </div>

        {/* Right Flag */}
        <div className="w-40 h-40 md:w-72 md:h-52">
          <Image
            src="/canada-flag.png"
            alt="Canadian Flag Right"
            width={300}
            height={300}
          />
        </div>
      </div>
    </>
  );
}
