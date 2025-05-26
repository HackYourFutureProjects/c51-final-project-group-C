import { Outlet } from "react-router-dom";
import Cards from "../../components/Cards";
import HomeSearch from "../../components/HomeSearch";

const Home = () => {
  return (
    <div className="relative">
      <HomeSearch />
      <Cards />
      <Outlet />
    </div>
  );
};

export default Home;
