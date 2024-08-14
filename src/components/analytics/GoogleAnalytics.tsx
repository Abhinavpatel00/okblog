


import Script from 'next/script';
import { useRouter } from 'next/router';
import siteMetadata from '@/data/siteMetadata';

const GAScript = () => {
  const router = useRouter();
  const gaId = siteMetadata.analytics.googleAnalyticsId;

  if (!gaId) {
    return null;
  }

  const handleRouteChange = (url) => {
    window.gtag('config', gaId, {
      page_path: url,
    });
  };

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />

      <Script strategy="lazyOnload" id="ga-script">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <Script strategy="lazyOnload" id="ga-listener">
        {`
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: router.asPath,
          });

          // Google Analytics event listener for Next.js route change
          window.addEventListener('routeChangeComplete', handleRouteChange);
          return () => {
            window.removeEventListener('routeChangeComplete', handleRouteChange);
          };
        `}
      </Script>
    </>
  );
};

export default GAScript;

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (action, category, label, value) => {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
