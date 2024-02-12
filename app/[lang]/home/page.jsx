import { getDictionary } from "../../../utils/dictionaries";
import Crosslikeicon from "../../components/icons/crosslikeicon";
import Dislikeicon from "../../components/icons/dislikeicon";
import Likeicon from "../../components/icons/likeicon";
import Loveicon from "../../components/icons/loveicon";

const Home = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-white">
      <div className="bg-tinder-1 bg-cover bg-center w-96 h-96 flex items-center justify-center">
        <div className=" text-tinder-gray text-center tracking-wide m-8">
          <h1 className="text-4xl font-bold mb-4">{dict.common.title}</h1>
          <p className="text-lg">{dict.common.welcome}</p>
        </div>
        <div className=" text-tinder-gray text-center tracking-wide m-8">
          <Likeicon />
          <Dislikeicon />
          <Loveicon />
          <Crosslikeicon />
        </div>
      </div>
    </div>
  );
};

export default Home;
