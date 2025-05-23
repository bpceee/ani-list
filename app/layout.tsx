import type { Metadata } from "next";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { ChakraProvider } from "@/providers/ChakraProvider";
import { UserProvider } from "@/context/UserContext";
import { AuthGuard } from "@/components/AuthGuard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Anime List",
  description: "List of anime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <ApolloProvider>
            <UserProvider>
              <Header />
              {/* 129px is the height of the header and footer combined  */}
              <main style={{ minHeight: "calc(100vh - 129px)" }}>
                <AuthGuard>{children}</AuthGuard>
              </main>
              <Footer />
            </UserProvider>
          </ApolloProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
