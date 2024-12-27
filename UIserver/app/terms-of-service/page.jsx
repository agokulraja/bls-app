import Head from 'next/head'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
      </Head>
      <div className="bg-gray-100 p-8 font-sans text-gray-800 text-justify">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-center text-[#570000] mb-4">Terms and Conditions</h1>

          {/* General Terms */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#570000] mb-2">1. General Terms</h2>
            <p>
              BLS India Visa and Consular Services (
              <a href="https://www.blsindia-canada.ca" className="text-[#570000] underline">
                www.blsindia-canada.ca
              </a>
              ) owns and operates this website. By using the website and its services, you agree to these Terms of Service, which may be updated periodically. You should check for updates regularly.
            </p>
            <p className="mt-2">
              <span className="font-semibold">Access:</span> The website is provided on a temporary basis, and BLS India Visa and Consular Services reserves the right to withdraw or change the services without notice. The company is not liable if the site is unavailable at any time.
            </p>
            <p className="mt-2">
              <span className="font-semibold">Linked Sites:</span> BLS India Visa and Consular Services does not control or take responsibility for linked websites. Your use of linked sites will be subject to their own terms and conditions.
            </p>
          </div>

          {/* Privacy Policy */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#570000] mb-2">2. Privacy Policy</h2>
            <p>
              BLS India Visa and Consular Services will not use your personal information, credit card details, or other data for anything other than processing visa applications. Your data will not be shared with third parties unless required by law. By using this site, you consent to data processing and confirm that the information you provide is accurate.
            </p>
          </div>

          {/* Prohibited Activities */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#570000] mb-2">3. Prohibited Activities</h2>
            <p>You agree not to misuse the website, including but not limited to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Committing criminal offenses.</li>
              <li>Distributing harmful content such as viruses or malware.</li>
              <li>Attempting to hack, disrupt, or damage the website or its users' experience.</li>
              <li>Sending unsolicited spam or promotional material.</li>
            </ul>
            <p className="mt-2">
              If you breach these terms, BLS India Visa and Consular Services may report your actions to law enforcement and disclose your identity.
            </p>
          </div>

          {/* Intellectual Property Rights */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#570000] mb-2">4. Intellectual Property Rights</h2>
            <p>
              BLS India Visa and Consular Services retains intellectual property rights over the content on the website, including images and software. You may use the content for personal purposes but may not reproduce, distribute, or use it for commercial purposes without explicit permission.
            </p>
          </div>

          {/* Terms of Sale */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#570000] mb-2">5. Terms of Sale</h2>
            <p>By placing an order, you make an offer to purchase a product under these conditions. Orders are subject to availability and order confirmation.</p>
            <p className="mt-2">
              <span className="font-semibold">Eligibility:</span> You must be over 18 years old and have a valid payment method.
            </p>
            <p className="mt-2">
              <span className="font-semibold">Order Confirmation:</span> A contract is formed only when you receive an email confirming that your service is being processed.
            </p>
            <p className="mt-2">
              <span className="font-semibold">Pricing and Availability:</span> Prices may change, and BLS India Visa and Consular Services will notify you of any errors in pricing. Delivery charges may apply.
            </p>
            <p className="mt-2">
              <span className="font-semibold">Payment:</span> BLS India Visa and Consular Services will perform a standard authorization check on your card. Once authorized, payment will be processed.
            </p>
            <p className="mt-2">
              <span className="font-semibold">Refunds:</span> You can cancel an order before it is submitted to government authorities and receive a refund (minus service charges). After submission, no refunds will be issued.
            </p>
          </div>

          {/* More Sections (Continue styling each section similarly) */}
        </section>

        {/* Delivery Policy Summary Section */}
        <section className="max-w-3xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-[#570000] mb-4">Delivery Policy Summary</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#570000] mb-2">No Liability for Courier Delays</h3>
            <p>BLS India Visa and Consular Services is not responsible for delays in delivery caused by the courier company. The company guarantees only to hand over the consignment to the courier service from the date of application and payment, or according to the agreed delivery time at the time of application confirmation.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#570000] mb-2">Dispatch Details</h3>
            <p>All applications will be dispatched to the registered address provided by the applicant in the application form.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#570000] mb-2">Responsibility for Document Damage</h3>
            <p>BLS India Visa and Consular Services is not liable for any damage to documents while they are in transit.</p>
          </div>
        </section>
      </div>
    </>
  )
}
