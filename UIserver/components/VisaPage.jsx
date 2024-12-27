import React from 'react';
import SeoLinkBlock from './seoLinkBlock';

const VisaBlogs = () => {
    // Array of blog data
    const blogPosts = [
        {
            title: 'Visa',
            link: 'https://blogs.blsindia-canada.ca/visa',
            description: 'Explore details about various visa services available for travel, work, and more.',
        },
        {
            title: 'Entry Visa for Parents on Basis',
            link: 'https://blogs.blsindia-canada.ca/entry-visa-parents-basis',
            description: 'Learn about the process and requirements for obtaining entry visas for parents.',
        },
        {
            title: 'Entry Visa for Minor of Indian Origin',
            link: 'https://blogs.blsindia-canada.ca/entry-visa-minor-indian-origin',
            description: 'Find out how to apply for an entry visa for minors of Indian origin.',
        },
        {
            title: 'Business Visa',
            link: 'https://blogs.blsindia-canada.ca/business-visa',
            description: 'Understand the business visa application process for entrepreneurs and professionals.',
        },
        {
            title: 'Entry Visa on Spousal Basis',
            link: 'https://blogs.blsindia-canada.ca/entry-visa-spousal-basis',
            description: 'Discover the steps to obtain an entry visa for spouses of foreign nationals.',
        },
        {
            title: 'Entry Visa for Adult of Indian Origin',
            link: 'https://blogs.blsindia-canada.ca/entry-visa-indian-origin-adult',
            description: 'Get all the information you need for obtaining an entry visa for adults of Indian origin.',
        },
    ];

    return (
        <div className="flex flex-col items-center p-6">
            {/* Header Section */}
            <div className="text-center mb-8 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    BLS India Visa Application Services: Simplifying Your Visa Process for Canada
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    Explore BLS India’s efficient and affordable visa application services for Canada. From business visas to entry visas for family members,                      we simplify the process with expert support and no hidden fees. Start your application today with BLS India       
   
                       </p>
                

            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-16  ">
                <div className="bg-blue-50 border border-gray-200 rounded-lg p-8 md:p-12 ">
                    <a
                        href="#"
                        className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
                    >
                        <img
                            src="/pngs/delivery.png"
                            alt="Courier Icon"
                            className="w-6 h-6 me-1.5"
                        />
                        Courier Services
                    </a>
                    <h2 className="text-gray-900 text-3xl font-extrabold mb-2">
                        Pick-Up and Drop-Off Services            </h2>
                    <a
                        href="/pickup-instructions"
                        className="text-blue-600 hover:underline font-medium text-lg inline-flex items-center"
                    >
                        Read more
                        <svg
                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
                <div className=" border border-gray-200 rounded-lg p-2 md:p-12 bg-red-200">
                    <a
                        href="/services"
                        className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
                    >
                        <img
                            src="/pngs/online-support.png"
                            alt="Courier Icon"
                            className="w-6 h-6 me-1.5"
                        />
                        Assistance Service
                    </a>
                    <h2 className="text-gray-900 text-3xl font-extrabold mb-2">
                        Form-Filling Assistance
                    </h2>

                    <a
                        href="/services"
                        className="text-blue-600 hover:underline font-medium text-lg inline-flex items-center"
                    >
                        Read more
                        <svg
                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>

            </div>
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 pb-7">
                {/* Map through the blogPosts array to create cards dynamically */}
                {blogPosts.map((post, index) => (
                    <a
                        key={index}
                        href={post.link}
                        className="block max-w-sm p-6 bg-white border border-gray-500 rounded-lg shadow hover:bg-gray-100"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            {post.title}
                        </h5>
                        <p className="font-normal text-gray-700">
                            {post.description}
                        </p>
                    </a>
                ))}
            </div>
            <SeoLinkBlock/>
        </div>
    );
};

export default VisaBlogs;
