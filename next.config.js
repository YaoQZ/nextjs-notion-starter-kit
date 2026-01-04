import path from 'node:path'
import { fileURLToPath } from 'node:url'

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line no-process-env
  enabled: process.env.ANALYZE === 'true'
})

export default withBundleAnalyzer({
  output: 'export', // ✅ 新增：开启静态导出（Next14+ 的正确方式）

  staticPageGenerationTimeout: 300,

  images: {
    unoptimized: true, // ✅ 新增：静态导出必须关闭 next/image 优化
    remotePatterns: [
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' }
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  webpack: (config) => {
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    config.resolve.alias.react = path.resolve(dirname, 'node_modules/react')
    config.resolve.alias['react-dom'] = path.resolve(
      dirname,
      'node_modules/react-dom'
    )
    return config
  },

  transpilePackages: ['react-tweet']
})
