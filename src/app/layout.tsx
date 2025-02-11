import type { Metadata } from "next";
import "./globals.css";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Portfolio Frontend ",
  description: "My portfolio frontend",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (

    <html lang="en" data-theme="dark">
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar session={session} />
        <div className="min-h-screen w-[90%] mx-auto">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
