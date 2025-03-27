import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";
import { deleteUser } from "../redux/slices/userSlice";

const UserDetails: React.FC = () => {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-lg w-2/5 p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            {user.name}
          </h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>

        <div className="mt-6 pt-4 text-gray-700">
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="mb-2">
            <strong>Website:</strong> {user.website}
          </p>
        </div>

        <div className="mt-4 pt-4 text-gray-700">
          <h3 className="text-lg font-semibold text-gray-800">Address</h3>
          <p className="mb-2">
            {user.address.suite}, {user.address.city}
          </p>
        </div>

        <div className="mt-4 pt-4 text-gray-700">
          <h3 className="text-lg font-semibold text-gray-800">Company</h3>
          <p className="mb-2">
            <strong>Name:</strong> {user.company.name}
          </p>
          <p className="mb-2">
            <strong>BS:</strong> {user.company.bs}
          </p>
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <Link
            to={`/edit-user/${user.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Delete
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/users"
            className="text-blue-500 hover:underline font-semibold"
          >
            Back to User List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
