'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, UserCheck, FileText, PlusCircle } from 'lucide-react'
import usePagePermission from '@/components/usePagePermission'

const PermissionCard = ({ title, description, icon, link }) => (
  <Link href={link} className="block">
    <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-md h-52 hover:shadow-lg hover:scale-105">
      <div className="flex items-center justify-center w-12 h-12 mb-4 text-indigo-500 bg-indigo-100 rounded-full">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
)

const PermissionsPage = () => {
  const pageId = 14;
  const { hasAccess, isLoading, userId } = usePagePermission(pageId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.934-.816 1.994-1.851L21 17.1V6.9a2 2 0 00-1.851-1.994L19 5H5a2 2 0 00-1.994 1.851L3 6.9v10.2c0 1.054.816 1.934 1.851 1.994L5 19z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Access Denied</h1>
          <p className="mt-2 text-gray-600">
            You do not have permission to view this page. Please contact the
            administrator for assistance.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Permissions Management</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PermissionCard
            title="Registered Users"
            description="Manage registered users and their status"
            icon={<Shield className="w-6 h-6" />}
            link="/user-permission"
          />
          <PermissionCard
            title="Activate Roles For Users"
            description="Assign or revoke roles for users"
            icon={<UserCheck className="w-6 h-6" />}
            link="/manage-roles"
          />
          <PermissionCard
            title="Page Permissions"
            description="Set access permissions for different pages"
            icon={<FileText className="w-6 h-6" />}
            link="/page-permissions"
          />
          <PermissionCard
            title="Create a Page"
            description="Add new pages and set their permissions"
            icon={<PlusCircle className="w-6 h-6" />}
            link="/create-pages"
          />
        </div>
      </div>
    </div>
  )
}

export default PermissionsPage

