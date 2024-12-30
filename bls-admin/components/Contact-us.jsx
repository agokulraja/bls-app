'use client'
import axios from 'axios'
import { useState } from 'react'
 

export default function ContactPage() {
  const [successMessage, setSuccessMessage] = useState('')
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required'
    }
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid'
    }
    if (!formData.phone) {
      errors.phone = 'Phone Number is required'
    } 
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    }
    return errors
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`, formData);
        if (response) {
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          })
          setErrors({})
          setSuccessMessage('Your message has been sent successfully!') 
        } else {
        
            setLoading(false)
          setErrors({ form: 'Failed to send message. Please try again later.' })
        }
      } catch (error) {
        setErrors({ form: 'Failed to send message. Please try again later.' })
        setLoading(false)
      }
      finally{
        setLoading(false)
      }
    } else {
      setErrors(validationErrors)
      setLoading(false)
    }
  }
 

  return (
    <>
  
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br sm:px-6 lg:px-8">
        <h1 className='mb-4 text-4xl font-semibold text-center text-red-800'>Contact Us for Embassy Services</h1>
        <p className='mb-6 text-xl font-normal text-center text-black'>
          Reach us for all Indian embassy service inquiries and assistance.
        </p>
      <div className="max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="md:flex">
          
          <div className="flex items-center justify-center bg-red-900 md:flex-shrink-0 md:w-48">
            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="w-full p-8">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Contact Us</h1>
            {errors.form && <p className="text-red-600">{errors.form}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="block w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <p className="text-red-600">{errors.message}</p>}
                
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-red-800 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                 {loading ? 'Sending' : 'Send Message'} 
                </button>
              </div>
            </form>
            {successMessage && <p className="mt-2 text-center text-green-600">{successMessage}</p>}

          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}
