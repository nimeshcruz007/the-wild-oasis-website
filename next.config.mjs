/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tdlgwforxmkoxitwehim.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/cabin/**',
            },
        ],
    },

};

export default nextConfig;
