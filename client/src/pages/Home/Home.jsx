import { Outlet } from "react-router-dom";
import Cards from "../../components/Cards";
import HomeSearch from "../../components/HomeSearch";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState();
  console.log(data);

  return (
    <div className="relative">
      <HomeSearch />
      <Cards />
      <Outlet />
    </div>
  );
};

export default Home;
