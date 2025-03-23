import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    suite: string;
    city: string;
  };
  company: {
    name: string;
  };
}

interface UserCardProps {
  user: User;
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({ index, user }) => {
  return (
    <tr
      key={user.id}
      className={`${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } border-transparent`}
    >
      <td className="border-0 p-2 px-6 ">{user.id}</td>
      <td className="border-0 p-2 px-6">{user.name}</td>
      <td className="border-0 p-2 px-6">{user.username}</td>
      <td className="border-0 p-2 px-6">
        {user.email}
        <br />
        {user.phone}
      </td>
      <td className="border-0 p-2 px-6">{user.website}</td>
      <td className="border-0 p-2 px-6">
        {user.address.suite}, {user.address.city}
      </td>
      <td className="border-0 p-2 px-6">{user.company.name}</td>
      <td className="border-0 p-2 px-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaEllipsisV className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default UserCard;
