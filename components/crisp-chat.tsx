"use client"

import { useEffect } from 'react'

interface CrispChatProps {
  websiteId?: string
}

export function CrispChat({ websiteId }: CrispChatProps) {
  useEffect(() => {
    if (!websiteId) return

    // Initialize Crisp
    if (typeof window !== 'undefined') {
      (window as any).$crisp = [];
      (window as any).CRISP_WEBSITE_ID = websiteId;

      const script = document.createElement('script')
      script.src = 'https://client.crisp.chat/l.js'
      script.async = true
      document.getElementsByTagName('head')[0].appendChild(script)
    }
  }, [websiteId])

  return null
}
