import Head from 'next/head';

const MetaData = ({ mData ={} }) => {
    
  return (
    // <>
    // </>
    <Head>
      {/* Basic Meta Tags */}
      <title>{mData.metaTitle || "Default Title"}</title>
      <meta name="description" content={mData.metaDescription || "Default description"} />
      <meta name="keywords" content={mData.metaKeywords || "default, keywords, here"} />
      <link rel="canonical" href={mData.ogUrl || process.env.NEXT_PUBLIC_PROD_URL} />

      <meta name="author" content={mData.author || "BLS"} />
      <meta name="publisher" content={mData.publisher || "Default Publisher"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={mData.metaTitle || "Default Title"} />
      <meta property="og:description" content={mData.metaDescription || "Default description"} />
      <meta property="og:url" content={mData.ogUrl || process.env.NEXT_PUBLIC_PROD_URL} />
      <meta property="og:image" content={mData.ogImage || `${process.env.NEXT_PUBLIC_PROD_URL}/_next/static/media/pickandDropOff.0c45a1f2.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={mData.metaTitle || "Default Title"} />
      <meta name="twitter:description" content={mData.metaDescription || "Default description"} />
      <meta name="twitter:image" content={mData.ogImage || `${process.env.NEXT_PUBLIC_PROD_URL}/_next/static/media/pickandDropOff.0c45a1f2.png`} />

      {/* Schema.org JSON-LD */}
      {mData.schemaData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mData.schemaData) }} />
      )}
    </Head>
  );
};

export default MetaData;
// import Head from 'next/head';

// const MetaData = ({ mData = {} }) => {
//   return (
//     <head>
//       <title>{mData.metaTitle || "Default Title"}</title>
//       <meta name="description" content={mData.metaDescription || "Default description"} />
//       <meta name="keywords" content={mData.metaKeywords || "default, keywords, here"} />
//       <link rel="canonical" href={mData.ogUrl || process.env.NEXT_PUBLIC_PROD_URL} />
//       <meta name="author" content={mData.author || "BLS"} />
//       <meta name="publisher" content={mData.publisher || "Default Publisher"} />

//       {/* Open Graph / Facebook */}
//       <meta property="og:type" content="website" />
//       <meta property="og:title" content={mData.metaTitle || "Default Title"} />
//       <meta property="og:description" content={mData.metaDescription || "Default description"} />
//       <meta property="og:url" content={mData.ogUrl || process.env.NEXT_PUBLIC_PROD_URL} />
//       <meta property="og:image" content={mData.ogImage || `${process.env.NEXT_PUBLIC_PROD_URL}/default-image.png`} />

//       {/* Twitter */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={mData.metaTitle || "Default Title"} />
//       <meta name="twitter:description" content={mData.metaDescription || "Default description"} />
//       <meta name="twitter:image" content={mData.ogImage || `${process.env.NEXT_PUBLIC_PROD_URL}/default-image.png`} />

//       {/* Schema.org JSON-LD */}
//       {mData.schemaData && (
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mData.schemaData) }} />
//       )}
//     </head>
//   );
// };
// export default MetaData;
