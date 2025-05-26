import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import Header from "./components/Header";
import TripPlanPage from "./pages/Create Trip/TripPlanPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip-plan" element={<TripPlanPage />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
      </Routes>
    </>
  );
};

export default App;
