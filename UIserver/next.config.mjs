/** @type {import('next').NextConfig} */
const nextConfig = {

   
    images: {
        unoptimized: true,
        domains: ['https://blsinternational.ca', 'blsinternational.ca', 'localhost','res.cloudinary.com'], // Add your image domains here
    },
    cacheMaxMemorySize: 0

};

export default nextConfig;
