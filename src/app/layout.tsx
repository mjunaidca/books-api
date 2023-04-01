import Nav from "@/views/Navbar";
import "./globals.css";

export const metadata = {
  title: "Book API App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 min-h-screen h-full">
        <Nav />
        {children}
      </body>
    </html>
  );
}
