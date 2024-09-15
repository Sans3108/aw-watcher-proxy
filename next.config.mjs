/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: 'chrome-extension://pkffcfjbnbhnbbgfeoanckhcnbpfobim' }]
      }
    ];
  }
};

export default nextConfig;
