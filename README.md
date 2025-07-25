# 🚀 PWA Store - React + Vite PWA Template

> Template PWA hiện đại và hoàn chỉnh cho ứng dụng mua sắm với tất cả best practices

![PWA Store](./public/pwa-512x512.png)

## ✨ Tính năng chính

### 📱 **PWA Features**
- ✅ **Offline Support** - Hoạt động hoàn toàn offline
- ✅ **Installable** - Cài đặt như native app
- ✅ **Auto Update** - Tự động cập nhật service worker
- ✅ **Push Notifications** Ready
- ✅ **Background Sync** Ready

### 🛍️ **Shopping Features**
- 🛒 **Shopping Cart** với localStorage persistence
- 🔍 **Product Search** thời gian thực
- 📱 **Mobile-first Design** responsive hoàn toàn
- 🎨 **Modern UI/UX** với toast notifications
- 🚀 **SPA Routing** với History API

### 🔧 **Technical Features**
- ⚡ **Vite** for lightning fast builds
- 🎯 **TypeScript** for type safety
- 🧩 **Code Splitting** với React.lazy
- 🎭 **Error Boundaries** for graceful errors
- 💾 **Smart Caching** strategies
- 🌐 **SEO Optimized** meta tags

## 🚀 Quick Start

```bash
# Clone template
git clone <your-repo> my-pwa-app
cd my-pwa-app

# Install dependencies
npm install
# hoặc
yarn install

# Start development server
npm run dev
# hoặc
yarn dev

# Build for production
npm run build
# hoặc
yarn build

# Preview production build
npm run preview
# hoặc
yarn preview
```

## 📂 Cấu trúc Project

```
my-pwa/
├── public/
│   ├── pwa-192x192.png          # PWA icon 192x192
│   ├── pwa-512x512.png          # PWA icon 512x512
│   ├── apple-touch-icon.png     # Apple touch icon
│   ├── offline.html             # Offline fallback page
│   ├── browserconfig.xml        # Microsoft tiles config
│   └── robots.txt               # SEO robots file
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx    # Error boundary component
│   │   └── LoadingSpinner.tsx   # Loading component
│   ├── App.tsx                  # Main app component
│   ├── App.css                  # App styles
│   ├── main.tsx                 # Entry point với SW registration
│   └── vite-env.d.ts           # Vite type definitions
├── vite.config.ts              # Vite + PWA configuration
├── index.html                  # HTML với PWA meta tags
└── package.json                # Dependencies
```

## ⚙️ Cấu hình PWA

### 🔧 **Vite Config** (`vite.config.ts`)
- ✅ **Auto Update Service Worker**
- ✅ **Smart Caching Strategies**
- ✅ **Asset Optimization**
- ✅ **Code Splitting**

### 📱 **Manifest** (tự động generated)
- ✅ **Complete Metadata**
- ✅ **Maskable Icons**
- ✅ **Screenshots**
- ✅ **Categories & Lang**

### 🌐 **HTML Meta Tags** (`index.html`)
- ✅ **PWA Essential Tags**
- ✅ **Apple Meta Tags**
- ✅ **Microsoft Meta Tags**
- ✅ **Open Graph & Twitter**
- ✅ **Security Headers**

## 🎯 Best Practices Implemented

### 1. **Manifest & Icons** ✅
- ✅ Manifest.json hoàn chỉnh với tất cả properties
- ✅ Icons 192x192 và 512x512 (maskable ready)
- ✅ Apple touch icon
- ✅ Microsoft tile configuration

### 2. **Service Worker** ✅
- ✅ Auto update với user confirmation
- ✅ Offline ready notification
- ✅ Runtime caching cho fonts và images
- ✅ Precaching cho essential assets

### 3. **Offline Support** ✅
- ✅ Offline.html fallback page
- ✅ Network status detection
- ✅ LocalStorage persistence
- ✅ Graceful degradation

### 4. **Code Splitting** ✅
- ✅ React.lazy và Suspense
- ✅ Error Boundaries
- ✅ Loading states
- ✅ Bundle optimization

### 5. **Mobile-First Design** ✅
- ✅ Responsive design
- ✅ Touch-friendly UI
- ✅ Bottom navigation for mobile
- ✅ Top navigation for desktop

### 6. **Performance** ✅
- ✅ Asset optimization
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Efficient caching

### 7. **SEO & Accessibility** ✅
- ✅ Meta tags optimization
- ✅ Semantic HTML
- ✅ ARIA attributes
- ✅ Robots.txt

### 8. **Error Handling** ✅
- ✅ Error boundaries
- ✅ Network error handling
- ✅ Fallback UI states
- ✅ User-friendly messages

## 🚀 Deployment

### **Netlify**
```bash
# Build
npm run build

# Deploy dist/ folder
```

### **Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **GitHub Pages**
```bash
# Build với base path
npm run build -- --base=/your-repo-name/

# Deploy dist/ to gh-pages branch
```

## 📊 Lighthouse Scores

Template này được optimize để đạt:
- 🟢 **Performance**: 95+
- 🟢 **Accessibility**: 95+
- 🟢 **Best Practices**: 95+
- 🟢 **SEO**: 95+
- 🟢 **PWA**: 100

## 🔧 Customization

### **Thay đổi Theme Colors**
```css
/* src/App.css */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --background-color: #f5f5f5;
}
```

### **Cập nhật Manifest**
```typescript
// vite.config.ts
manifest: {
  name: 'Your App Name',
  short_name: 'Your App',
  theme_color: '#your-color',
  // ...
}
```

### **Thêm Routes**
```typescript
// src/App.tsx
case '/your-route':
  return <YourComponent />
```

## 🛠️ Development Tips

### **Testing PWA**
1. Build production: `npm run build`
2. Preview: `npm run preview`
3. Test trên mobile device
4. Kiểm tra với Lighthouse
5. Test offline functionality

### **Service Worker Debug**
1. Mở Chrome DevTools
2. Vào tab Application
3. Kiểm tra Service Workers
4. Test Cache và Network

### **Performance Monitoring**
- Sử dụng Lighthouse CI
- Monitor với Google Analytics
- Track Core Web Vitals

## 📚 Resources

- [PWA Best Practices](https://web.dev/pwa-checklist/)
- [Vite PWA Plugin](https://vite-plugin-pwa.netlify.app/)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [React PWA Guide](https://create-react-app.dev/docs/making-a-progressive-web-app/)

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for blazing fast build tool
- [Workbox](https://developers.google.com/web/tools/workbox) for service worker
- [React](https://reactjs.org/) for UI framework

---

**🚀 Happy coding! Chúc bạn build được PWA tuyệt vời!**
