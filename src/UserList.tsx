import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { fetchUsersDetails } from "./redux/slices/userSlice";
import UserCard from "./UserCard";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUsersDetails()).then((response: any) => {
      setUserDetails(response.payload);
    });
  }, [dispatch]);

  const filteredUsers = userDetails.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto p-4 w-full">
        {/* Shared container for search and table */}
        <div className="bg-white p-4 rounded-md shadow-md">
          {/* Search bar */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search users..."
              className="w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
              Add User
            </button>
          </div>

          {/* Table */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <UserCard key={index} user={user} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
