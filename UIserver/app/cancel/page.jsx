import { XCircle, Home } from "lucide-react"
import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-red-100 to-white">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <XCircle className="w-12 h-12 mx-auto text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Payment Cancelled
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Your payment was cancelled. If you have any questions, please contact our support team info@blsindia-canada.ca.
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/" className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg">
            <Home className="w-4 h-4 mr-2" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
