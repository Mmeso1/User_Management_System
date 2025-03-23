import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import UserCard from "./pages/UserCard";
import UserForm from "./pages/UserForm";

function App() {
  return (
    <Routes>
      <Route path="/users">
        <Route index element={<UserList />} />
        <Route path=":id" element={<UserCard />} />
      </Route>
      <Route path="add-user" element={<UserForm />} />
    </Routes>
  );
}

export default App;
