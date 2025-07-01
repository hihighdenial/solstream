import { useNavigate } from "react-router-dom";
import { listed } from "../constant/listed";
import { Button2 } from "./ui/Button";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(listed.login);
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Button2 label="Get Started" label2="di clik" onClick={handleClick} />
            {/* <button className="btn btn-primary" onClick={handleClick}>
              Get Started
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
