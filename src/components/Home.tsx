import Hero from "../components/Home/Hero";
import HomeBlogs from "../components/Home/HomeBlogs";

const Home = () => {
  return (
    <div className="w-full mt-1">
      <div className="w-full max-w-7xl mx-auto border-b border-base-900">
        <Hero />
        <HomeBlogs />
      </div>
    </div>
  );
};

export default Home;
