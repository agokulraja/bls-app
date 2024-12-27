import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Fotter";
import Cookies from "js-cookie";
import WhatsAppButton from "@/components/Whatsapp";

import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "BLS International Services Canada - Your Trusted Partner for Indian Consulate Services",
  description:
    "BLS International Services Canada helps make the application process for the Indian consulate easy and efficient. Our team ensures a smooth experience with accurate and timely submissions for all your embassy-related needs.",
  keywords: [
    "Indian consulate services",
    "BLS International Services Canada",
    "Indian embassy assistance",
    "embassy application support",
    "Canada Indian consulate help",
  ],
  openGraph: {
    url: process.env.NEXT_PUBLIC_PROD_URL,
    title: "BLS International Services Canada - Your Trusted Partner for Indian Consulate Services",
    description:
      "BLS International Services Canada helps make the application process for the Indian consulate easy and efficient. Our team ensures a smooth experience with accurate and timely submissions for all your embassy-related needs.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PROD_URL}/_next/static/media/pickandDropOff.0c45a1f2.png`,
        width: 800,
        height: 600,
        alt: "BLS International Services Canada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLS International Services Canada",
    description: "Your trusted partner for Indian Consulate services.",
    images: [`${process.env.NEXT_PUBLIC_PROD_URL}/images/default-twitter-image.jpg`],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_PROD_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16801876140"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16801876140');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <WhatsAppButton
          tooltipText="We are available! Click here to chat"
          phoneNumber="+12892012094"
          message="Hi India Visa and Consular Services, I would like to inquire about courier services."
        />

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <section className="flex justify-center w-full bg-[#570000]">
          <Navbar />
        </section>
        {children}
        <section className="flex justify-center w-full bg-red-900">
          <Footer />
        </section>
      </body>
    </html>
  );
}
