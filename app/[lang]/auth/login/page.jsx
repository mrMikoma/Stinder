import { Loginform } from "../../../components/Loginform";
import { getDictionary } from "@/utils/dictionaries";

const Login = async ({ params: lang }) => {
  const dict = await getDictionary(lang.lang);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tinder-pink text-black relative">
      <div className="flex flex-col items-center">
        <Loginform dict={dict} />
      </div>
    </div>
  );
};

export default Login;
