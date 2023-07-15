/** @type {import('next').NextConfig} */
const nextConfig = ({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.coinranking.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // webpack: (config) => {
  //   // 기존의 웹팩 플러그인에 새로운 Dotenv플러그인을 연결시켜준다.
  //   // silent는 옵션은 .env파일을 찾지 못했을 때 에러를 일으키지 않도록 설정해주는 옵션이다.

  //   config.resolve.fallback = {
  //     tls: false,
  //     fs: false,
  //     net: false
  //   };
  //   return config;
  // }
})
module.exports = nextConfig
