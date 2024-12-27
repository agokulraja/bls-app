import PickupDropPage from '@/components/PickupDropPage';

export const metadata = {
  title: "Pick Up and Drop Off Services - Affordable and Reliable Delivery | BLS International Services Canada",
  description: "Get reliable and affordable pick-up and drop-off services with BLS International Services Canada. We ensure hassle-free delivery at unbeatable prices.",
  keywords: [
    "pick up and drop off services",
    "affordable delivery",
    "reliable consulate delivery",
    "BLS International Services Canada",
    "Indian consulate delivery services"
  ],
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
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_PROD_URL}/pickup-instructions`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PROD_URL}/_next/static/media/pickandDropOff.0c45a1f2.png`,
      },
    ],
  },
  
  schema: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BLS International Services Canada",
    url: process.env.NEXT_PUBLIC_PROD_URL,
    logo: "https://res.cloudinary.com/dh8lem2fe/image/upload/v1730923835/images/btboul1xutmdzsopv0ou.avif",
    description: "BLS International Services Canada offers affordable and reliable pick-up and drop-off services for Indian consulate applications. We ensure smooth and hassle-free delivery.",
    sameAs: [
     
    ],
  },
};

export default function PickupDropServerPage() {
  return <PickupDropPage />;
}
