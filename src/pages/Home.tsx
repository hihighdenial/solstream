import Navbar from "../components/Navbar";
import Banner from "../components/banner";
import Movielist from "../components/movielist";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div>
      <Navbar />

      <Banner />
      <div className="w-full">
        <Movielist />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
