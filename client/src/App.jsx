import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import Header from "./components/Header";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
