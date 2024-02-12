import { getDictionary } from "../../../utils/dictionaries";

const Register = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tinder-pink text-white relative">
      <div className="flex flex-col items-center">
        <h2>Login</h2>
        <form>
          <div>
            <label>Username:</label>
            <input
              type="text"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <h2 className="text-lg font-bold mt-4">{dict.login.loginproblem}</h2>
    </div>
  );
};

export default Register;
