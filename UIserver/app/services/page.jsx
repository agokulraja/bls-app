'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Info, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SeoLinkBlock from '@/components/seoLinkBlock';


  const registrationData = [
    {
      title: "PCC",
      calanderly:"https://calendly.com/blsindia-canada-info/pcc-1-1-form-filling-assitance",
      linktext:"PCC",
      id: 1,
      sections: [
        {
          title: "Before you start",
          content: "Please ensure you have all necessary documents ready before beginning the registration process."
        },
        {
          title: "Prerequisites",
          content: [
            "Kindly be ready with Applicant's image and Applicant's signature image (Max size 1MB).",
            "The height and width of the Applicant Photo must be equal.",
            "The minimum dimensions are 200 pixels (width) x 200 pixels (height).",
            "The maximum dimensions are 3500 pixels (width) x 3500 pixels (height).",
            "The height and width of the Signature Photo must have an aspect ratio of 1:3.",
            "The minimum dimensions are 200 pixels (width) x 67 pixels (height).",
            "The maximum dimensions are 3500 pixels (width) x 2500 pixels (height).",
            "Kindly be ready with supporting documents in PDF format (Max size 1000kb)."
          ]
        },
        {
          title: "After Registration",
          content: "After completing the registration process, you will receive a confirmation email with further instructions."
        }
      ]
    },
    {
      title: "Passport Renewal - Adult",
      calanderly:"https://calendly.com/blsindia-canada-info/pcc-1-1-form-filling-assitance-clone",
      linktext:"Passport-Renewal-Adult",
      id: 2,
      sections: [
        {
          title: "Before you start",
          content: "Make sure you have scanned copies of all required documents and photos."
        },
        {
          title: "Required Documents",
          content: [
            "Indian Passport (first and last page)",
            "Canadian Status proof",
            "Parent's Passport copy if there is a name change",
            "Indian and Canadian address proofs",
            "Aadhar Card (optional)"
          ]
        },
        {
          title: "Emergency Contact",
          content: [
            "Emergency Contact Name",
            "Emergency Contact Address",
            "Emergency Contact Number"
          ]
        }
      ]
    },
    {
      title: "Passport Renewal - Minor",
      calanderly:"https://calendly.com/blsindia-canada-info/passport-renewal-adult-1-1-form-filling-assi-clone",
      linktext: "Passport-Renewal-Minor",
      id: 3,
      sections: [
        {
          title: "Before you start",
          content: "Ensure that both parents' documents are ready, as well as any relevant address proofs."
        },
        {
          title: "Required Documents",
          content: [
            "Minor’s Indian Passport (first and last page)",
            "Parents' Indian Passport Copy",
            "Canadian Status (for minor and parents)",
            "Indian and Canadian address proofs",
            "Aadhar Card (optional)"
          ]
        },
        {
          title: "Emergency Contact",
          content: [
            "Emergency Contact Name",
            "Emergency Contact Address",
            "Emergency Contact Number"
          ]
        }
      ]
    },
    {
      title: "Passport Surrender",
      calanderly:"https://calendly.com/blsindia-canada-info/passport-renewal-minor-1-1-form-filling-assi-clone",

      linktext: "Passport-Surrender",
      id: 4,
      sections: [
        {
          title: "Before you start",
          content: "Collect all documents related to your citizenship change and surrender certificate."
        },
        {
          title: "Required Documents",
          content: [
            "Indian Passport (first and last page)",
            "Citizenship Certificate",
            "Canadian Passport or Foreign Passport",
            "Canada Address Proof",
            "Aadhar Card (optional)"
          ]
        },
        {
          title: "Emergency Contact",
          content: [
            "Emergency Contact Name",
            "Emergency Contact Address",
            "Emergency Contact Number"
          ]
        }
      ]
    },
    {
      title: "OCI Adult - Indian Origin",
      calanderly:"https://calendly.com/blsindia-canada-info/passport-surrender-1-1-form-filling-assistance-clone",
      linktext: "OCI-Adult-Indian-Origin",
      id: 5,
      sections: [
        {
          title: "Before you start",
          content: "Ensure that you have copies of your surrender certificate, family information, and relevant address proofs."
        },
        {
          title: "Required Documents",
          content: [
            "Surrender Certificate (if applicable)",
            "Indian Passport (first and last page)",
            "Citizenship Certificate",
            "Canadian Passport",
            "Marriage Certificate",
            "Spouse and Family Member Details (if applicable)"
          ]
        },
        {
          title: "Family Information",
          content: [
            "Parents’ Nationality",
            "Parents’ Occupation",
            "Spouse’s Current Passport and Occupation",
            "Relatives’ OCI Card details (if applicable)"
          ]
        }
      ]
    },
    {
      title: "OCI Minor - Indian Origin",
      calanderly:"https://calendly.com/blsindia-canada-info/oci-adult-indian-1-1-form-filling-assistanc-clone",
      linktext: "OCI-Minor-Indian-Origin",
      id: 6,
      sections: [
        {
          title: "Before you start",
          content: "Prepare copies of documents related to the minor’s citizenship, as well as both parents' documents."
        },
        {
          title: "Required Documents",
          content: [
            "Surrender Certificate (if applicable)",
            "Minor’s Indian Passport (first and last page)",
            "Minor’s Citizenship Certificate",
            "Minor’s Canadian Passport",
            "Parents' Indian and Canadian Status Documents",
            "Marriage Certificate of Parents"
          ]
        }
      ]
    }
  ];
  


export default function Component() {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedSections, setExpandedSections] = useState([])

  const toggleSection = (index) => {
    setExpandedSections(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  return (
    <>
     <div className="bg-[#F4E3B8] items-center py-10 px-4">
      <h1 className="mb-4 text-4xl font-semibold text-center text-red-800 mt-8">
      BLS Form Filling Service: Quick, Accurate, and Hassle-Free Assistance

</h1>
      <p className="max-w-4xl mx-auto text-center text-gray-950">
      Get your BLS form filling done easily and accurately with our expert service. We ensure to complete your form filling within 20-40 minutes through a personalized 1:1 call. Trust our BLS form filling service for a seamless and error-free experience!
      </p>
      <p className="max-w-3xl mx-auto font-semibold text-center text-red-900 mt-4">
      Step 1- Choose Your Service,  Step 2- Book Your Slot, Step 3- 1:1 Call Assistance
      </p>
    </div>
  
    <div className="bg-[#F4E3B8] mx-auto py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#FFF8E1] to-[#FFE4B5]">
          <div className="w-full lg:w-1/3 p-4 space-y-4 bg-[#F4E3B8] shadow-lg mb-4 lg:mb-0">
            {registrationData.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  index === activeTab ? 'bg-[#E9967A] text-white font-semibold shadow-md' : 'bg-white text-black'
                } cursor-pointer hover:bg-[#E9967A] hover:text-white transition-all duration-300 ease-in-out`}
                onClick={() => setActiveTab(index)}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className="w-full p-2 bg-white rounded-lg shadow-xl md:p-6 md:m-4 lg:w-2/3">
            <h1 className="text-xl md:text-3xl font-bold mb-6 p-4 bg-[#2F4F4F] text-white rounded-lg shadow-md">
              {registrationData[activeTab]?.title}
            </h1>
            <div className="space-y-4">
              {registrationData[activeTab]?.sections.map((section, index) => (
                <div key={index} className="overflow-hidden border border-gray-200 rounded-lg">
                  <div 
                    className={`flex items-center justify-between p-4 cursor-pointer transition-colors duration-300 ease-in-out ${
                      expandedSections.includes(index) ? 'bg-[#E9967A] text-white' : 'bg-gray-100 text-black'
                    }`}
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center">
                      <Info className="mr-2" size={20} />
                      <span className="font-semibold">{section.title}</span>
                    </div>
                    {expandedSections.includes(index) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                  {expandedSections.includes(index) && (
                    <div className="p-4 bg-white">
                      {Array.isArray(section.content) ? (
                        <ul className="pl-6 space-y-2 list-disc">
                          {section.content.map((item, itemIndex) => (
                            <li className="text-gray-700" key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700">{section.content}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <Link href={`${registrationData[activeTab].calanderly}`} className="flex items-center px-6 py-3 text-white transition-colors duration-300 ease-in-out bg-green-600 rounded-lg shadow-md hover:bg-green-700">
                Proceed
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SeoLinkBlock/>

    </>
  )
}
