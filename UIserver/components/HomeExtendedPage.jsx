

import React from "react";
import SeoLinkBlock from "./seoLinkBlock";

const HomeExtendedPage = () => {
    return (
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12 mb-8">
                    <a
                        href="#"
                        className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2"
                    >
                        <img
                            src="/pngs/personal-information.png"
                            alt="information Icon"
                            className="w-6 h-6 me-1.5"
                        />
                        Info
                    </a>
                    <h1 className="text-gray-900 text-3xl md:text-5xl font-extrabold mb-2">
                        Welcome to BLS India Visa and Consular Services
                    </h1>
                    <p className="text-lg font-normal text-gray-500 mb-6">
                        We are here to simplify your journey through Indian embassy-related processes in Canada. Our mission is to provide a hassle-free, reliable, and affordable solution for document submissions—whether it’s form filling or doorstep courier services.


                    </p>
                    <a
                        href="/"
                        className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-red-900 hover:bg-red-700 focus:ring-4 focus:ring-blue-300"
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
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
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
                        <p className="text-lg font-normal text-gray-500 mb-4">
                            We understand how busy life can get. That’s why we offer reliable, door-to-door services to handle your application documents with care.
                        </p>
                        <p className="text-lg font-normal text-gray-500 mb-4" >Get reliable pickup and drop-off services from us at Unbeatable prices. We ensure hassle-free and Affordable delivery!

                        </p>
                        <ul className="list-disc list-inside text-lg font-normal text-gray-500 mb-4">
                            <li>Pick-Up Service:</li>
                            <li>Pick-Up and Drop-Off (Together)</li>
                            <li>Pick-Up and Drop-Off (Together)</li>
                        </ul>
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
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
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
                        <p className="text-lg font-normal text-gray-500 mb-4">
                            Are you tired of navigating lengthy, complicated forms? Let us take the
                            hassle off your hands!
                        </p>
                        <p className="text-lg font-normal text-gray-500 mb-4">
                            We specialize in a wide range of applications, including:
                        </p>
                        <ul className="list-disc list-inside text-lg font-normal text-gray-500 mb-4">
                            <li>Police Clearance Certificate (PCC)</li>
                            <li>Passport Renewal for Adults</li>
                            <li>Passport Renewal for Minors</li>
                            <li>Passport Surrender</li>
                            <li>OCI (Overseas Citizen of India) for Adults - Indian Origin</li>
                            <li>OCI (Overseas Citizen of India) for Minors - Indian Origin</li>
                        </ul>
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
            </div>
            <SeoLinkBlock />
        </section>
    );
};



export default HomeExtendedPage;
