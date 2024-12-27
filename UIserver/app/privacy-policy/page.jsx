import React from 'react';

const Policies = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-justify">
      <h1 className="text-3xl font-bold text-center text-[#570000] mb-12">BLS India Visa and Consular Services Policies</h1>

      {/* DISCLAIMER Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#570000] mb-6">DISCLAIMER</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          BLS India Visa and Consular Services is not responsible for any delays caused by the courier company. We guarantee that the consignment will be handed over to the courier service from the date of application submission and payment, or according to the delivery schedule agreed upon at the time of application confirmation.
        </p>
        <p className="text-gray-700 leading-relaxed">
          All applications will be shipped to the applicant’s registered address provided in the application. BLS India Visa and Consular Services is not liable for any damage to documents that may occur during transit. We make every effort to dispatch documents on time. In the event of a delay and if we are unable to ship within our usual timeframe, we will notify you in advance.
        </p>
      </section>

      {/* PRIVACY POLICY Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#570000] mb-6">PRIVACY POLICY</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          As a general policy, this website does not collect personal information from visitors. Users can typically access the site without providing any personal details, unless they choose to submit such information.
        </p>

        <h3 className="text-xl font-semibold text-[#570000] mt-6 mb-2">Site Visit Data</h3>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
          <li>The IP address from which the user accesses the website</li>
          <li>The type of browser and operating system used</li>
          <li>The date and time of access</li>
          <li>The pages viewed and documents downloaded</li>
          <li>The address of any referring website if the user arrives via a link from another site</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-4">
          This data is used solely to improve the user experience on the website. BLS India Visa and Consular Services does not track or record personal details of visitors unless there is an attempt to harm the site.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          BLS India Visa and Consular Services does not identify individuals or track their browsing behavior, except when required by law enforcement through a legal request for server log inspection.
        </p>

        <h3 className="text-xl font-semibold text-[#570000] mt-6 mb-2">Cookies</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          A cookie is a small piece of data sent by the website to a user's browser when they visit. This website uses cookies, but not for gathering personal information.
        </p>

        <h3 className="text-xl font-semibold text-[#570000] mt-6 mb-2">Email Management</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          An email address is collected only if the user sends a complaint or feedback message. It will be used exclusively for that purpose and will not be added to a mailing list or used for any other reason unless explicitly intended by the user. The email address will not be shared without the user's consent.
        </p>

        <h3 className="text-xl font-semibold text-[#570000] mt-6 mb-2">Collection of Personal Information</h3>
        <p className="text-gray-700 leading-relaxed">
          If users are requested to provide additional personal information, they will be informed about its intended use. If users believe these privacy principles have not been followed, or if they have any concerns, they can contact the webmaster via the contact page.
        </p>
      </section>

      {/* COPYRIGHT POLICY Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#570000] mb-6">COPYRIGHT POLICY</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The contents of this website may not be reproduced, in whole or in part, without explicit permission from BLS India Visa and Consular Services. If referenced on another website, the source must be properly credited. The material on this site must not be used in any misleading or inappropriate context.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Permission to reproduce content does not apply to materials identified as the copyright of third parties. Authorization to use such materials must be obtained directly from the respective copyright holders.
        </p>
      </section>

      {/* REFUND POLICY Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#570000] mb-6">REFUND POLICY</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          In the event of a refund, the amount will be credited back to your Visa card or net banking account. Refunds are typically processed within 14 to 15 business days.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Before accepting the document, please ensure that the packaging is intact and has not been damaged or tampered with. Please note that any returned documents will undergo verification and inspection by our team to assess the validity of your complaint. If the returned document is found to be undamaged or not defective, we will notify you, and the same document will be reshipped to the shipping address provided in the application. In such cases, you will be responsible for the return shipping and reshipment charges.
        </p>
      </section>
    </div>
  );
};

export default Policies;
