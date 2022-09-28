/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            ],
        })
  
        return config
    },

    async rewrites() {
        return [
            {
                source: '/api/v1/auth-service/:path*',
                destination: 'http://localhost:3010/api/v1/auth-service/:path*',
            },
            {
                source: '/api/v1/main-service/:path*',
                destination: 'http://localhost:3020/api/v1/main-service/:path*',
            }
        ]
    },
};

module.exports = nextConfig;