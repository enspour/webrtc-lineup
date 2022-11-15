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
                source: '/api/v1/:path*',
                destination: 'http://localhost:8080/api/v1/:path*',
            }
        ]
    },
};

module.exports = nextConfig;