import heroImage from "../assets/hero-image.jpg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      navigate("/create-trip-plan");
    } else {
      navigate("/login");
    }
  };
  const name = isAuthenticated ? "Create trip" : "Get started";

  return (
    <section className="bg-background">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-text">
            Every idea is a destination
          </h1>
          <p className="max-w-2xl mb-6 font-light text-text/70 lg:mb-8 md:text-lg lg:text-xl">
            Plan your next adventure. Create trips, share memories, rate
            locations, and explore journeys you can copy and make your own.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleGetStartedClick}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-accent rounded-lg hover:opacity-90 focus:ring-4 focus:ring-accent/50"
            >
              {name}
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
          <div className="max-w-xl">
            <img
              src={heroImage}
              alt="Scenic destination preview"
              className="w-full h-auto rounded-xl shadow-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
