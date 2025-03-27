import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/UserList";
import UserCard from "./pages/UserDetails";
import UserForm from "./pages/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux/store";
import { RootState } from "./redux/store";
import { fetchUsersDetails } from "./redux/slices/userSlice";
import { useEffect } from "react";

function Home() {
  return (
    <div className="container mx-auto text-center flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="py-3 font-bold text-5xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
        Welcome to my User Management System
      </h1>
      <style>
        {`
          @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
          }
          .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
          }
        `}
      </style>
      <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline cursor-pointer">
        <Link to="/users">View Users</Link>
      </button>
    </div>
  );
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsersDetails());
    }
  }, [status, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users">
        <Route index element={<UserList />} />
        <Route path=":id" element={<UserCard />} />
      </Route>
      <Route path="add-user" element={<UserForm />} />
      <Route path="edit-user/:id" element={<UserForm />} />
    </Routes>
  );
}

export default App;
