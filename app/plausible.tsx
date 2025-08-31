"use client"
import Script from 'next/script'

export default function Plausible() {
  if (!process.env.NEXT_PUBLIC_SITE_URL || !process.env.PLAUSIBLE_DOMAIN) return null
  return (
    <>
      <Script
        defer
        data-domain={process.env.PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
      <Script id="web-vitals" strategy="afterInteractive">
        {`
          function reportWebVitals(metric){
            const body = JSON.stringify(metric);
            if(navigator.sendBeacon){
              navigator.sendBeacon('/api/plausible', body)
            } else {
              fetch('/api/plausible', {method:'POST', body, keepalive:true});
            }
          }
          (window).reportWebVitals = reportWebVitals;
        `}
      </Script>
    </>
  )
}

