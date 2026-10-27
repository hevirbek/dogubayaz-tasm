/** @type {import('next').NextConfig} */
function supabaseHostname() {
  const raw = process.env.SUPABASE_URL;

  if (!raw) {
    return null;
  }

  try {
    return new URL(raw).hostname;
  } catch {
    return null;
  }
}

const storageHost = supabaseHostname();

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: storageHost
      ? [
          {
            protocol: "https",
            hostname: storageHost,
            pathname: "/storage/v1/object/public/**"
          }
        ]
      : []
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb"
    }
  }
};

export default nextConfig;
