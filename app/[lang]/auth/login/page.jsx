import { Loginform } from "../../../components/Loginform";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tinder-pink text-black relative">
      <div className="flex flex-col items-center">
        <Loginform />
      </div>
    </div>
  );
};

export default Login;
