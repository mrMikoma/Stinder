import Navbar from "../../components/Navbar";
import { getDictionary } from "@/utils/dictionaries";

const AppLayout = async ({ children, params: lang }) => {
  const dict = await getDictionary(lang.lang);
  return (
    <section>
      <Navbar dict={dict} />
      {children}
    </section>
  );
};

export default AppLayout;
