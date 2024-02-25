import Image from "next/image";

const Matchcard = ({ props }) => {
  const { username, imageSrc, bio} = props;

  return (
    <div className="flex flex-col max-w-md align-top">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Image
          src={imageSrc}
          alt="Profile"
          className="rounded-lg mb-4"
          width="400"
          height="400"
        />
        <h2 className="text-2xl font-bold">{username}</h2>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
};

export default Matchcard;
