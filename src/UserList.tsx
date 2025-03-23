import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { fetchUsersDetails } from "./redux/slices/userSlice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";

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
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white">Add User</button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Website</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">
                  {user.email}
                  <br />
                  {user.phone}
                </td>
                <td className="border p-2">{user.website}</td>
                <td className="border p-2">
                  {user.address.suite}, {user.address.city}
                </td>
                <td className="border p-2">{user.company.name}</td>
                <td className="border p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <FaEllipsisV className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
