import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Convospace",
  description: "",
};

export default function RootLayout({ children }) {
  // const env = process.env.NODE_ENV;
  // if (env == "development" && window) {
  //   window.backendURL = process.env.DEVLOPMENT_BACKEND_URL;
  // } else if (env == "production") {
  //   window.backendURL = "/"
  // }
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
