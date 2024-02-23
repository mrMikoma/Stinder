"use client";
import { register } from "@/utils/actions";
import { useRouter } from "next/navigation";

export const Registerform = ({dict}) => {
  const router = useRouter();

  const createUser = (formData) => {
    const handleCreateUser = async (formData) => {
      const response = await register(formData);
      if (response === "success") {
        console.log("User registered");
        router.push("/auth/login");
      } else {
        console.error("User not failed");
      }
    };
    handleCreateUser(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action={createUser}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">{dict.register.title}</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            {dict.register.username}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            placeholder={dict.register.username}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            {dict.register.email}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            placeholder={dict.register.email}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            {dict.register.password}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            placeholder={dict.register.password}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-tinder-pink hover:bg-tinder-gray text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {dict.register.submit}
          </button>
        </div>
      </form>
    </div>
  );
};
