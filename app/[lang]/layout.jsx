import "../../styles/globals.css";

export const metadata = {
  title: "LUT-Stinder",
  description: "This is a LUT-Stinder website.",
  keywords:
    "LUT-Stinder, LUT, Stinder, Lappeenranta, University, Technology, Students",
  icons: {
    icon: "/icon.png",
  },
};

const RootLayout = ({ children }) => (
  <html>
    <body>
      <main className="bg-tinder-pink">{children}</main>
    </body>
  </html>
);

export default RootLayout;
