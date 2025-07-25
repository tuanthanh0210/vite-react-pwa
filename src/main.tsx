import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

// Register service worker with update detection
const updateSW = registerSW({
  onNeedRefresh() {
    // Show update available notification
    if (confirm('Có phiên bản mới của ứng dụng. Bạn có muốn cập nhật không?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('PWA is ready to work offline')
    // Show offline ready notification
    const toast = document.createElement('div')
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
      ">
        ✅ App đã sẵn sàng hoạt động offline!
      </div>
    `
    document.body.appendChild(toast)
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 3000)
  },
  onRegistered(r: ServiceWorkerRegistration | undefined) {
    console.log('SW Registered:', r)
  },
  onRegisterError(error: unknown) {
    console.log('SW registration error', error)
  },
})

// Network status detection
function updateOnlineStatus() {
  const isOnline = navigator.onLine
  
  if (!isOnline) {
    // Show offline indicator
    const offlineIndicator = document.createElement('div')
    offlineIndicator.id = 'offline-indicator'
    offlineIndicator.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ef4444;
        color: white;
        text-align: center;
        padding: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      ">
        📵 Bạn đang offline - Một số tính năng có thể bị hạn chế
      </div>
    `
    
    // Remove existing indicator
    const existing = document.getElementById('offline-indicator')
    if (existing) {
      document.body.removeChild(existing)
    }
    
    document.body.appendChild(offlineIndicator)
  } else {
    // Remove offline indicator
    const existing = document.getElementById('offline-indicator')
    if (existing) {
      document.body.removeChild(existing)
    }
  }
}

// Listen for online/offline events
window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

// Check initial status
updateOnlineStatus()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
