// app/components/PWARegistration.tsx (Marque como 'use client')
'use client'

import { useEffect } from 'react'

export default function PWARegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js') // O arquivo sw.js deve estar em /public
        .then((reg) => console.log('Service Worker registrado!', reg))
        .catch((err) => console.error('Falha ao registrar SW:', err))
    }
  }, [])

  return null
}