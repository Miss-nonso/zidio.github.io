import purpleLocationIcon22 from "../../assets/images/purpleLocationIcon22.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen bg-blue-100 p-3 items-center gap-3">
      <div className="h-full">
        <img
          src={purpleLocationIcon22}
          alt="Location icon"
          className="rotate h-full w-full"
        />
      </div>
      <h1 className="text-center border border-borderPurple  py-10  px-7 font-semibold text-[1.5rem] leading-5 rounded-2xl md:w-1/2">
        <p className="text-1.1rem pb-4 text-purple-950 md:text-[2rem]">
          Welcome to
        </p>
        <span className="inline-block pt-4 text-darkPink ">
          <span className="border-borderPurple py-10 md:text-[5rem] md:py-[2rem] md:block">
            ZIDIO <br />
          </span>
          <span className="pt-2 inline-block leading-6 text-purple-950 md:text-[2rem]">
            Location tracker
          </span>
        </span>
      </h1>

      <div className="flex gap-7 h-1/4 md:flex-col md:gap-4 md:w-1/4">
        <Link to={"/register"} className="hover:border-borderPurple">
          <button className="bg-darkPink py-3 px-4 text-offWhite text-[1.05rem] rounded-xl transition-all duration-300 ease-in-out hover:opacity-95 hover:py-4 hover:text-offWhite hover:text-[1.1rem] focus:outline-borderPurple md:rounded-3xl md:w-full md:text-purple-950">
            Register
          </button>
        </Link>
        <Link to={"/login"}>
          <button className="bg-darkPink py-3 px-4 text-offWhite text-[1.05rem]  rounded-xl transition-all duration-300 ease-in-out hover:opacity-95 hover:py-4 hover:text-offWhite hover:text-[1.1rem] focus:outline-borderPurple md:rounded-3xl md:w-full md:text-purple-950">
            {" "}
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
