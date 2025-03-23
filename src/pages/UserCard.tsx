import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";
import { deleteUser } from "../redux/slices/userSlice";

const UserCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : NaN;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) =>
    state.users.usersDetails.find((user) => user.id === userId)
  );

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
      navigate("/users");
      alert("User deleted successfully.");
    }
  };

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
        <div className="mt-4  flex justify-between">
          <div className="flex gap-4 items-center">
            <Link
              to={`/edit-user/${user.id}`}
              className="inline-block self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline cursor-pointer"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 h-10 rounded-md font-bold hover:bg-red-700 focus:outline-none focus:shadow-outline cursor-pointer"
            >
              Delete
            </button>
          </div>
          <Link
            to="/users"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-4 cursor-pointer"
          >
            Back to User List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
