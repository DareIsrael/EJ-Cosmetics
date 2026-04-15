import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from '@/components/SessionProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import CustomToast from '@/components/CustomToast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AJ Cosmetic - Premium Beauty Products",
  description: "Your one-stop shop for premium cosmetic products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <NextAuthProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="min-h-screen pt-16">{children}</main>
              <CustomToast />
              <Footer />
            </CartProvider>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}