import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersDetails } from "../redux/slices/userSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.usersDetails);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsersDetails());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-center py-8">Loading users...</div>;
  }

  if (status === "failed") {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <Link
          to="/add-user"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          <FaPlus className="inline-block" /> Add User
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="block rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-600">Username: {user.username}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserList;
