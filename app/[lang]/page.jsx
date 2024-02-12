import Link from "next/link";
import { getDictionary } from "../../utils/dictionaries";
import Button from "../components/Button.jsx";

const Home = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tinder-pink text-white relative">
      <div className="flex flex-row items-center fixed top-0 sm:right-0 p-4">
        <Link href="/fi" locale="fi" className="m-1 hover:text-tinder-gray">
          <p className="">FI</p>
        </Link>
        <span className="devider-bottom text-tinder-gray m-2"></span>
        <Link href="/en" locale="en" className="m-1 hover:text-tinder-gray">
          <p className="">EN</p>
        </Link>
      </div>

      <div className=" text-white text-center tracking-wide m-8">
        <h1 className="text-4xl font-bold mb-4">{dict.common.title}</h1>
        <p className="text-lg">{dict.common.welcome}</p>
      </div>
      <div className="flex flex-col items-center">
        <Button props={{ header: dict.nav.login, url: "/login" }} />
        <Button props={{ header: dict.nav.login_google, url: "/api/auth/signin" }} />
        <Button props={{ header: dict.nav.register, url: "/register" }} />
      </div>
      <h2 className="text-lg font-bold mt-4">{dict.login.loginproblem}</h2>
    </div>
  );
};

export default Home;
