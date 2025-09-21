import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "BurgerLife - Fun Burger Cooking Game Online | BurgerLife.online",
  description:
    "Play BurgerLife, the ultimate burger cooking game! Create delicious burgers, serve customers, and build your restaurant empire. Free to play online!",
  generator: "v0.app",
  keywords:
    "BurgerLife, burger game, cooking game, restaurant game, online game, free game, kids games, family games, browser games",
  authors: [{ name: "BurgerLife.online" }],
  creator: "BurgerLife.online",
  publisher: "BurgerLife.online",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code-here",
  },
  alternates: {
    canonical: "https://burgerlife.online",
  },
  openGraph: {
    title: "BurgerLife - Fun Burger Cooking Game Online",
    description: "Play BurgerLife, the ultimate burger cooking game! Create delicious burgers and serve customers.",
    url: "https://burgerlife.online",
    siteName: "BurgerLife",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://burgerlife.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BurgerLife - Fun Burger Cooking Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BurgerLife - Fun Burger Cooking Game Online",
    description: "Play BurgerLife, the ultimate burger cooking game! Create delicious burgers and serve customers.",
    images: ["https://burgerlife.online/og-image.jpg"],
  },
  other: {
    "google-site-verification": "your-google-verification-code-here",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable}`}>
      <head>
        <link rel="canonical" href="https://burgerlife.online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="application-name" content="BurgerLife" />
        <meta name="apple-mobile-web-app-title" content="BurgerLife" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BurgerLife",
              url: "https://burgerlife.online",
              description:
                "Play BurgerLife, the ultimate burger cooking game! Create delicious burgers, serve customers, and build your restaurant empire.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://burgerlife.online/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              sameAs: ["https://burgerlife.online"],
            }),
          }}
        />

        <style>{`
html {
  font-family: ${openSans.style.fontFamily};
  --font-heading: ${workSans.variable};
  --font-body: ${openSans.variable};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
