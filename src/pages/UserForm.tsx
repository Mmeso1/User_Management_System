import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = {
      id: new Date().getTime(),
      name: formData.get("fullname") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      website: formData.get("website") as string,
      address: {
        suite: formData.get("suite") as string,
        city: formData.get("city") as string,
      },
      company: {
        name: formData.get("company-name") as string,
        bs: formData.get("company-bs") as string,
      },
    };
    dispatch(addUser(user));
    // alert("User added successfully!");
    navigate("/users");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add User</h1>
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
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company-name" className="block text-gray-600">
              Company Name
            </label>
            <input
              type="text"
              id="company-name"
              name="company-name"
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company-bs" className="block text-gray-600">
              Comapny BS
            </label>
            <input
              type="text"
              id="company-bs"
              name="company-bs"
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Add User
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
