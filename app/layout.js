import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import "./themes-config.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "christiandam.xyz",
  description: "My space on the internet.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Theme
          accentColor="amber"
          grayColor="sand"
          radius="medium"
          scaling="100%"
        >
          {children}
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
