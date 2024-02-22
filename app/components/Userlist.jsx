import React from "react";

const Userlist = ({ users }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 shadow rounded">
            <h3 className="text-xl font-semibold truncate">{user.username}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userlist;
