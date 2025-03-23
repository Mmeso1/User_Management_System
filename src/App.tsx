import "./App.css";
import { useEffect, useState } from "react";
import getUsersData from "./api/user_data";

// Define a TypeScript type for the user object
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

function App() {
  const [users, setUsers] = useState<User[]>([]); // Set the type of users as an array of User objects

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersData(); // Use the imported function to fetch data
        setUsers(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <p className="text-bold text-2xl text-amber-300">Hello World!</p>
      <ul className="list-disc list-inside">
        {users.map((user) => (
          <>
            <li key={user.id}>
              {user.name} - {user.email} <br />
              Phone: {user.phone} <br /> Website: {user.website}
            </li>
            <br />
          </>
        ))}
      </ul>
    </>
  );
}

export default App;
