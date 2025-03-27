import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../redux/slices/userSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get user ID from URL
  const userId = id ? parseInt(id, 10) : null;

  // Get user details from Redux if in edit mode
  const existingUser = useSelector((state: RootState) =>
    state.users.usersDetails.find((user) => user.id === userId)
  );

  // Form state: If editing, pre-fill fields with existing user data
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    avatar: "",
    suite: "",
    city: "",
    companyName: "",
    companyBs: "",
  });

  useEffect(() => {
    if (existingUser) {
      setFormData({
        fullname: existingUser.name,
        username: existingUser.username,
        email: existingUser.email,
        phone: existingUser.phone,
        website: existingUser.website,
        avatar: existingUser.avatar,
        suite: existingUser.address.suite,
        city: existingUser.address.city,
        companyName: existingUser.company.name,
        companyBs: existingUser.company.bs,
      });
    }
  }, [existingUser]);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      id: userId || new Date().getTime(), // Use existing ID for editing, generate new ID for adding
      name: formData.fullname,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      avatar: formData.avatar,
      address: {
        suite: formData.suite,
        city: formData.city,
      },
      company: {
        name: formData.companyName,
        bs: formData.companyBs,
      },
    };

    if (userId) {
      dispatch(updateUser(user)); // Edit existing user
    } else {
      dispatch(addUser(user)); // Add new user
    }

    navigate("/users"); // Redirect to user list
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          {userId ? "Edit User" : "Add User"}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="w-full border rounded-md p-2"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border rounded-md p-2"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded-md p-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full border rounded-md p-2"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="website" className="block text-gray-600">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              className="w-full border rounded-md p-2"
              value={formData.website}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="suite" className="block text-gray-600">
              Suite
            </label>
            <input
              type="text"
              id="suite"
              name="suite"
              className="w-full border rounded-md p-2"
              value={formData.suite}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full border rounded-md p-2"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-600">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="w-full border rounded-md p-2"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyBs" className="block text-gray-600">
              Company BS
            </label>
            <input
              type="text"
              id="companyBs"
              name="companyBs"
              className="w-full border rounded-md p-2"
              value={formData.companyBs}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline cursor-pointer"
          >
            {userId ? "Update User" : "Add User"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
