import PassportBlogs from "@/components/PassportPage";

export const metadata = {
  title: "BLS India Passport Application Services: Simplifying Your Passport Process",
  description:
    "Explore BLS India’s efficient and reliable passport application services. From renewals to emergency issuance, we provide expert support and transparent pricing. Start your passport journey with us today.",
  keywords: [
    "BLS India Passport services",
    "passport renewal process",
    "emergency passport issuance",
    "passport for minors",
    "lost passport application",
    "damaged passport replacement",
  ],

  openGraph: {
    title: "BLS India Passport Application Services",
    description:
      "Simplify your passport application process with BLS India. We offer reliable services, expert guidance, and transparent pricing for passport renewal, replacements, and more.",
    url: `${process.env.NEXT_PUBLIC_PROD_URL}/passport`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PROD_URL}/images/passport-services.jpg`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BLS India Passport Application Services",
    description:
      "Simplify your passport application with BLS India. Reliable guidance for renewals, replacements, and minor applications.",
    images: [`${process.env.NEXT_PUBLIC_PROD_URL}/images/default-twitter-image.jpg`],
  },

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_PROD_URL}/passport`,
  },

  robots: {
    index: true,
    follow: true,
  },

  additionalMetaTags: [
    {
      name: "author",
      content: "BLS International Services India",
    },
    {
      name: "publisher",
      content: "BLS International Services India",
    },
  ],

  other: {
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "BLS India Passport Application Services",
      serviceType: "Passport application, renewal, and replacement services",
      provider: {
        "@type": "Organization",
        name: "BLS International Services India",
        url: `${process.env.NEXT_PUBLIC_PROD_URL}`,
      },
      description:
        "BLS India provides a range of passport-related services, including renewals, replacements, and applications for minors, ensuring a seamless process for customers.",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
    },
  },
};





export default function passPortPage() {
  return <PassportBlogs />;
}
