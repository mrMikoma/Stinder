import {
  logAllUsers,
  logAllChats,
  createDummyUsers,
  likeMe,
} from "@/utils/actions";

const Debugtools = () => {
  // Declare debug tool buttons
  const LogUsersButton = () => {
    const handlelogAllUsers = async () => {
      return (
        <form
          action={async () => {
            await logAllUsers();
          }}
        >
          <button type="submit">log users</button>
        </form>
      );
    };
    return handlelogAllUsers();
  };

  const LogChatsButton = () => {
    const handlelogAllChats = async () => {
      return (
        <form
          action={async () => {
            await logAllChats();
          }}
        >
          <button type="submit">log chats</button>
        </form>
      );
    };
    return handlelogAllChats();
  };

  const CreateDummyUsersButton = () => {
    const handleCreateDummyUsers = async () => {
      return (
        <form
          action={async () => {
            await createDummyUsers();
          }}
        >
          <button type="submit">create users</button>
        </form>
      );
    };
    return handleCreateDummyUsers();
  };

  const MakeAllLikeMe = () => {
    const handleLikeMe = async () => {
      return (
        <form
          action={async () => {
            await likeMe();
          }}
        >
          <button type="submit">like me</button>
        </form>
      );
    };
    return handleLikeMe();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 border border-black p-2">
      <h3>DEBUG TOOLS</h3>
      <LogUsersButton />
      <LogChatsButton />
      <CreateDummyUsersButton />
      <MakeAllLikeMe />
    </div>
  );
};

export default Debugtools;
