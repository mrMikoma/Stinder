import "../../styles/globals.css";
import Footer from "../components/Footer";

export const metadata = {
  title: "LUT-Stinder",
  description: "This is a LUT-Stinder website.",
  keywords:
    "LUT-Stinder, LUT, Stinder, Lappeenranta, University, Technology, Students",
  icons: {
    icon: "/icon.png",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main className="bg-tinder-pink">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
