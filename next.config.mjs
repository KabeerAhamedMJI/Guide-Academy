/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export" വേണ്ട
  // basePath വേണ്ട
  // assetPrefix വേണ്ട
  images: {
    // ഇത് വേണമെങ്കിൽ വെക്കാം, ഇല്ലെങ്കിലും പ്രശ്നമില്ല
    unoptimized: true,
  },
};

export default nextConfig;
