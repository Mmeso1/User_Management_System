import { Link } from "react-router-dom";

interface IUserCardProps {
  id: number;
  avatar: string;
  name: string;
  username: string;
  email: string;
}

const UserCard: React.FC<IUserCardProps> = ({
  id,
  avatar,
  name,
  username,
  email,
}) => {
  return (
    <Link
      key={id}
      to={`/users/${id}`}
      className="block rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      <div className="p-4 text-left">
        <img src={avatar} alt="avatar" className="w-28 h-auto mx-auto mb-7" />
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">Username: {username}</p>
        <p className="text-gray-600">Email: {email}</p>
      </div>
    </Link>
  );
};

export default UserCard;
