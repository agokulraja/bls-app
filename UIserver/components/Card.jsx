import Link from 'next/link'
import { MapPin, Phone, Mail, Globe, ChevronRight } from 'lucide-react'

export default function Card() {
  const jurisdictions = [
    {
      name: "TORONTO JURISDICTION",
      description: "All locations below fall under the Consular Jurisdiction of the Consulate in Toronto",
      locations: [
        "Ontario (Except Applicants residing at Postal Code starting with letter K) Quebec (Except Applicants residing at Postal Codes starting with letters J, H, K)",
        "Manitoba",
        "New Brunswick",
        "Nova Scotia",
        "Prince Edward Island",
        "New foundland"
      ],
      icon: <Globe className="w-5 h-5 text-[#570000]" />
    },
    {
      name: "OTTAWA JURISDICTION",
      description: "All locations below fall under the Consular Jurisdiction of the High Commissioner in Ottawa",
      locations: [
        "National Capital Region of Ottawa- Hull",
        "Ontario (Applicants residing at postal code starting with K)",
        "Montreal (Quebec, applicant residing at postal code starting with J, H)",
        "Kingston, Cornwall, Hawkesbury, Arnprior, Renfrew, Perth, Prescott, Brockville, Carleton Place, Smith's Falls Morrisburg (all Ontario)",
        "Nunavut Territories"
      ],
      icon: <Globe className="w-5 h-5 text-[#570000]" />
    },
    {
      name: "VANCOUVER JURISDICTION",
      description: "All locations below fall under the Consular Jurisdiction of the Consulate in Vancouver",
      locations: [
        "Saskatchewan",
        "Alberta",
        "British Columbia",
        "Yukon Territory",
        "Northwest Territories"
      ],
      icon: <Globe className="w-5 h-5 text-[#570000]" />
    }
  ]

  return (
    <div className="sm:px-4 lg:px-6 mb-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
          {jurisdictions.map((jurisdiction, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded border border-gray-300  bg-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center mb-2">
                  {jurisdiction.icon}
                  <h2 className="ml-2 text-lg font-semibold text-[#ba6427]">{jurisdiction.name}</h2>
                </div>
                <p className="mb-3 text-sm text-gray-600">{jurisdiction.description}</p>
                <ul className="space-y-1">
                  {jurisdiction.locations.map((location, locIndex) => (
                    <li key={locIndex} className="flex items-start text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 mt-0.5 mr-1 text-[#570000]" />
                      <span>{location}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center mt-4">
                <Link
                  href="https://blogs.blsindia-canada.ca/contact"
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-[#2a2929] transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
