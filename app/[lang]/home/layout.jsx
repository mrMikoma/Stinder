import Navbar from "../../components/Navbar";

const AppLayout = ({ children }) => (
  <section>
      <Navbar />
      {children}
  </section>
);

export default AppLayout;
