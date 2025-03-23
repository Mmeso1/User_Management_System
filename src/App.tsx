import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserList from "./UserList";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<UserList />} />
      </Route>
    </Routes>
  );
}

export default App;
