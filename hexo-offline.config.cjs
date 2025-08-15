/** @type {import('workbox-build').GenerateSWOptions} */
module.exports = {
  // Workbox 模式：生成 Service Worker
  mode: 'generateSW',

  // 需要缓存的文件匹配规则
  globPatterns: [
    '**/*.{html,js,css,woff2,woff,ttf,png,jpg,jpeg,svg,gif,webp,ico}'
  ],

  // 最大缓存文件大小（默认 2MB，这里设为 5MB）
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,

  // 缓存策略
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 天
        }
      }
    },
    {
      urlPattern: /\.(?:css|js)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources'
      }
    }
  ],

  // 离线 fallback 页面（可选）
  navigateFallback: '/offline.html',

  // 额外要缓存的本地文件
  additionalManifestEntries: [
    '/lib/fontawesome/css/all.min.css',
    '/lib/animate/animate.min.css',
    '/lib/gitalk/gitalk.css',
    '/lib/gitalk/gitalk.min.js'
  ]
}
