import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Mustafa Khan",
  description: "Mustafa Khan's personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="App">
          <NavBar />
          <div id="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
