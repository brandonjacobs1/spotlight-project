/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'spotlight-16th-ward.s3.us-east-2.amazonaws.com',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
}

module.exports = nextConfig
