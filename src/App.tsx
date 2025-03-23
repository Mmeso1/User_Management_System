import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserList from "./UserList";
import UserCard from "./UserCard";

function App() {
  return (
    <Routes>
      <Route path="/users">
        <Route index element={<UserList />} />
        <Route path=":id" element={<UserCard />} />
      </Route>
    </Routes>
  );
}

export default App;
