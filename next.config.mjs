/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "purecatamphetamine.github.io",
        port: "",
        pathname: "/country-flag-icons/3x2/**",
      },
    ],
  },
};

export default nextConfig;
