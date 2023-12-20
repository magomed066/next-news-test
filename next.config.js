/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '65storage.storage.yandexcloud.net' },
		],
	},
}

module.exports = nextConfig
