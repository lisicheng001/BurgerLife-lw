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
  keywords: "BurgerLife, burger game, cooking game, restaurant game, online game, free game",
  authors: [{ name: "BurgerLife.online" }],
  openGraph: {
    title: "BurgerLife - Fun Burger Cooking Game Online",
    description: "Play BurgerLife, the ultimate burger cooking game! Create delicious burgers and serve customers.",
    url: "https://BurgerLife.online",
    siteName: "BurgerLife",
    type: "website",
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
        <link rel="canonical" href="https://BurgerLife.online" />
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
