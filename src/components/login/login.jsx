import { Link, json } from "react-router-dom";
import { useState, useContext } from "react";
import bcrypt from "bcryptjs";
import purpleLocationIcon22 from "../../assets/images/purpleLocationIcon22.png";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isExisting, setIsExisting] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (email, password) => {
    const getUsers = localStorage.getItem("allUsers");
    const storedUsers = JSON.parse(getUsers);
    let retrivedPwd;

    const findUser =
      storedUsers.length >= 1
        ? storedUsers.find((user) => user.email === email)
        : setIsExisting(false);

    // findUser
    //   ? retrivedPwd = bcrypt
    //       .compare(password, findUser.password)
    //       .then((response) => ( response))
    //   : setIsExisting(false) & setIsMatched(false);

    findUser
      ? bcrypt
          .compare(password, findUser.password)
          .then((response) =>
            response
              ? setIsExisting(true) &
                setIsMatched(true) &
                setUserEmail("") &
                setPassword("")
              : findUser.email === email &&
                setIsMatched(false) & setIsExisting(true)
          )
      : setIsExisting(false) & setIsMatched(false);

    console.log(retrivedPwd);

    // findUser
    //   ? retrivedPwd === true
    //     ? setIsExisting(true) &
    //       setIsMatched(true) &
    //       setUserEmail("") &
    //       setPassword("")
    //     : findUser.email === email && setIsMatched(false) & setIsExisting(true)
    //   : setIsExisting(false);

    // findUser
    //   ? findUser.password === password && findUser.email === email
    //     ? setIsExisting(true) &
    //       setIsMatched(true) &
    //       setUserEmail("") &
    //       setPassword("")
    //     : findUser.password !== password &&
    //       findUser.email === email &&
    //       setIsMatched(false) & setIsExisting(true)
    //   : setIsExisting(false);
  };

  console.log("isExisting :" + isExisting);
  console.log("isMatched :" + isMatched);

  return (
    <section
      className="bg-offWhite h-[100dvh] md:h-screen overflow-y-hidden  
      md:bg-gradient-to-r from-offWhite from-70% to-bodyPurple to-30%

    "
    >
      <h1 className="left-0 absolute top-2 flex items-center justify-start ">
        <img
          src={purpleLocationIcon22}
          alt="Zidio location tracker logo"
          className="h-[3rem] rotate"
        />
        <p className="text-4xl font-bold text-darkPink"> ZIDIO</p>
      </h1>
      <div className="max-sm:pl-4 pt-[8rem]  max-md:pl-4 pl-[7rem] h-full ">
        <div className="flex gap-[1rem] items-center justify-center md:gap-[4rem] h-[80%]">
          <form
            action=""
            method="get"
            className="md:w-[45%] w-[90%]
           flex flex-col gap-4
        "
            onSubmit={(e) => {
              e.preventDefault() &
                handleSubmit(userEmail, password) &
                setIsSubmitted(true);
            }}
          >
            <h2 className="font-bold text-center text-[1.6rem]">
              Welcome Back!
            </h2>

            <div className="grid gap-2">
              <label htmlFor="email address" className="text-left ">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={userEmail}
                required
                className="h-[2.25rem] rounded-3xl border border-borderPurple outline-none px-4 py-2 focus:border-bodyPurple focus:outline-bodyPurple "
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setIsMatched(false);
                  setIsSubmitted(false);
                }}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email address" className="text-left">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                required
                className="h-[2.25rem] rounded-3xl border border-borderPurple outline-none px-4 py-2 focus:border-bodyPurple focus:outline-bodyPurple "
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsMatched(false);
                  setIsSubmitted(false);
                }}
              />
            </div>

            <div className="mt-8">
              <div className="text-center text-darkPink font-normal text-[1.05rem] pb-4">
                {isSubmitted &&
                  (!isExisting && !isMatched ? (
                    "Oops! No user with the provided email"
                  ) : isExisting & !isMatched ? (
                    "You have provided an incorrect password"
                  ) : isExisting && isMatched ? (
                    <p>
                      <span className="inline-block pr-10">
                        {" "}
                        Login succcessful ✅
                      </span>
                      <Link
                        to={"/dashboard"}
                        className="beep pl-10 text-base font-normal border bg-borderPurple border-borderPurple px-5 py-2 rounded-xl"
                      >
                        Go to dashboard ...
                      </Link>
                    </p>
                  ) : (
                    ""
                  ))}
              </div>

              <button
                type="submit"
                className="bg-borderPurple py-3 rounded-3xl text-[1.1rem] w-full text-white transition-all duration-300 ease-in-out p-[0.3rem] mt-4 hover:border-darkPink hover:px-[0.4rem]  hover:text-[1.11rem] hover:opacity-90 active:border-darkPink focus:border-darkPink focus:outline-darkPink"
              >
                Login
              </button>
            </div>
            <p>
              Dont have an account?
              <Link to={"/register"} className="hover:text-darkPink pl-2">
                {isSubmitted ? "Dashboard" : "Register"}
              </Link>
            </p>
          </form>

          <div className="hidden md:flex md:items-end md:h-4/6 md:pl-[5rem]">
            {/* <img src={laptop} alt="Laptop icon" /> */}
            <img
              src={purpleLocationIcon22}
              alt="Location icon"
              className=" rotate w-full h-full"
            />
          </div>
        </div>

        {/* <div className="h-1/4  relative -mt-[4rem] -ml-[9rem] hidden md:flex">
          <img src={darkElem} className="backdrop-hue-rotate-180" />
          <img src={lighterElem} className="absolute top-2" />
        </div> */}
      </div>
    </section>
  );
};

export default Login;
