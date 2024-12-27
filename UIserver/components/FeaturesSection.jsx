import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs, stats,services } from '@/app/utils/FaqConsts';


const TabbedInterface = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [openAccordion, setOpenAccordion] = useState('');

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? '' : id);
  };
 

  return (
    <div className="w-full  border  rounded-lg shadow mt-20 border-t border-red-900 bg-red-900 shadow-transparent">
      {/* Mobile dropdown */}
      <div className="sm:hidden">
        <select
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          <option value="stats">Statistics</option>
          <option value="services">Services</option>
          <option value="faq">FAQ</option>
        </select>
      </div>

      {/* Desktop tabs */}
      <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex">
        {['stats', 'services', 'faq'].map((tab) => (
          <li key={tab} className="w-full">
            <button
              className={`inline-block w-full p-4 ${
                activeTab === tab
                  ? 'bg-gray-100'
                  : 'bg-gray-50 hover:bg-gray-100'
              } focus:outline-none`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab content */}
      <div className="border-t border-red-900">
        {/* Statistics tab */}
        {activeTab === 'stats' && (
          <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-white sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{stat.value}</dt>
                <dd className="text-white">{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Services tab */}
        {activeTab === 'services' && (
          <div className="p-4 bg-white md:p-8">
            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900">
              Expert Consular Services at Your Fingertips
            </h2>
            <p className="mb-6 text-gray-600">
              Navigating Indian consulate applications can be complex, but our team of experts is here to make the process smooth and efficient. We provide comprehensive assistance for all your consular needs, ensuring accuracy and timely submission.
            </p>
            <ul className="space-y-4 text-gray-500">
              {services.map((service, index) => (
                <li key={index} className="flex space-x-2 items-center">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-blue-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="leading-tight">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQ tab */}
        {activeTab === 'faq' && (
          <div className="p-4 bg-white">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500"
                  onClick={() => toggleAccordion(faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      openAccordion === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === faq.id && (
                  <div className="py-5 text-gray-500">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedInterface;