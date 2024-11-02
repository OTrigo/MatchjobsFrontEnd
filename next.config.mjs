/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/Ntynk9k/noavatar.png",
      },
    ],
  },
};

export default nextConfig;
