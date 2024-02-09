

import { getDictionary } from "../../../utils/dictionaries";


const Login = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tinder-pink text-white relative">
      <div className="flex flex-col items-center">
        asd
      </div>
      <h2 className="text-lg font-bold mt-4">{dict.login.loginproblem}</h2>
    </div>
  );
};

export default Login;