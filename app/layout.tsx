import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { SITE_DESCRIPTION, SITE_NAME, SITE_PARENT, SITE_URL } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} by ${SITE_PARENT}`,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "AI prompts",
    "prompt library",
    "AI agents",
    "creator tools",
    "n8n",
    "MCP",
    "ChatGPT prompts",
    "Claude prompts",
    "JSON prompts"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — prompts, agents & workflows for creator-solopreneurs`,
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} by ${SITE_PARENT}`,
    description: SITE_DESCRIPTION
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_PARENT,
      url: SITE_URL
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
