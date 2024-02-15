import { SessionProvider } from "next-auth/react";
import Navbar from "../../components/Navbar";

const AppLayout = ({ children }) => (
  <section>
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  </section>
);

export default AppLayout;
