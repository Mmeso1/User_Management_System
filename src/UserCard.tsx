import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const UserCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : NaN;
  const user = useSelector((state: RootState) =>
    state.users.usersDetails.find((user) => user.id === userId)
  );

  if (!user) {
    return <div className="text-center py-8">User not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {user.name}
        </h2>
        <p className="text-gray-600 mb-2">Username: {user.username}</p>
        <p className="text-gray-600 mb-2">Email: {user.email}</p>
        <p className="text-gray-600 mb-2">Phone: {user.phone}</p>
        <p className="text-gray-600 mb-2">Website: {user.website}</p>
        <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
          Address
        </h3>
        <p className="text-gray-600 mb-2">Suite: {user.address.suite}</p>
        <p className="text-gray-600 mb-2">City: {user.address.city}</p>
        <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
          Company
        </h3>
        <p className="text-gray-600 mb-2">Name: {user.company.name}</p>
        <p className="text-gray-600 mb-2">BS: {user.company.bs}</p>
        <Link
          to="/users"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-4"
        >
          Back to User List
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
