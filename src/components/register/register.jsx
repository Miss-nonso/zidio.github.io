import { Link, json } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import icon from "../../assets/images/icon.png";
import validator from "validator";
import nextId from "react-id-generator";
import { useContext, useState } from "react";
import bcrypt from "bcryptjs";
import purpleLocationIcon22 from "../../assets/images/purpleLocationIcon22.png";

const salt = bcrypt.genSaltSync(10);

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { allUsers, setAllUsers } = useContext(UserContext);
  const [isExisting, setIsExisting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const errorMsg = (
    <small className="text-darkPink text-[0.9rem] place-self-end pr-2 pt-2">
      Invalid entry
    </small>
  );
  console.log(allUsers);
  const HandleSubmit = (first_name, last_name, email, userPassword) => {
    const hashedPassword = bcrypt.hashSync(userPassword, salt);
    // const hashedEmail = bcrypt.hashSync(email, salt);

    const findUser =
      allUsers.length >= 1
        ? allUsers.find((user) => user.email === email)
        : localStorage.setItem(
            "allUsers",
            JSON.stringify(
              setAllUsers([
                ...allUsers,
                {
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  password: hashedPassword
                }
              ])
            )
          );

    findUser
      ? setIsExisting(true)
      : password === confirmPassword &&
        setAllUsers([
          ...allUsers,
          {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword
          }
        ]) &
          localStorage.setItem(
            "allUsers",
            JSON.stringify([
              ...allUsers,
              {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword
              }
            ])
          ) &
          (setFirstname("") &
            setLastname("") &
            setEmail("") &
            setPassword("") &
            setConfirmPassword("")) &
          setIsRegistered(true);

    // setAllUsers([...storedUsers]);

    // findUser
    //   ? setIsExisting(true)
    //   : password === confirmPassword &&
    //     setAllUsers([
    //       ...allUsers,
    //       {
    //         first_name: first_name,
    //         last_name: last_name,
    //         email: email,
    //         password: userPassword
    //       }
    //     ]) &
    //       (setFirstname("") &
    //         setLastname("") &
    //         setEmail("") &
    //         setPassword("") &
    //         setConfirmPassword("")) &
    //       setIsRegistered(true);
  };

  return (
    <div className="flex justify-center px-4 items-center bg-blue-100 md:h-screen">
      <h1 className="left-0 absolute top-2 flex items-center justify-start ">
        <img
          src={purpleLocationIcon22}
          alt="Zidio location tracker logo"
          className="h-[3rem] rotate"
        />
        <p className="text-4xl font-bold text-darkPink"> ZIDIO</p>
      </h1>
      <div className="rotate w-[45%] hidden md:flex">
        <img
          src={purpleLocationIcon22}
          alt="page badge"
          className="max-w-[70%] h-[550px] relative top-0 left-16 bottom-0"
        />
      </div>

      <div className="md:w-[45%] w-full md:pr-10 pt-[6rem] flex flex-col gap-4 items-center text-justify py-16">
        <h5 className="text-center font-semibold text-gray-900 text-[1.3rem] py-4">
          Please Fill out this form to Register
        </h5>
        <form
          action=""
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            HandleSubmit(firstname, lastname, email, password);
          }}
          className="md:w-[70%] w-full"
        >
          <div className="flex flex-col mb-4 ">
            <label htmlFor="name" className=" ">
              First name
            </label>
            <input
              className="h-[2.25rem] rounded-3xl border border-borderPurple outline-none px-4 py-2 focus:border-bodyPurple focus:outline-bodyPurple capitalize"
              type="text"
              name="fullname"
              required
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                setIsRegistered(false);
              }}
            />
            {!firstname || firstname.length < 3
              ? firstname && errorMsg
              : !/^[a-zA-Z]+$/.test(firstname)
              ? firstname && errorMsg
              : ""}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="">
              Last name
            </label>
            <input
              className="h-[2.25rem] rounded-3xl border border-borderPurple outline-none px-4 py-2 focus:border-bodyPurple focus:outline-bodyPurple capitalize"
              type="text"
              name="fullname"
              required
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
                setIsRegistered(false);
              }}
            />

            {!lastname || lastname.length < 3
              ? lastname && errorMsg
              : !/^[a-zA-Z]+$/.test(lastname)
              ? lastname && errorMsg
              : ""}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              className="h-[2.25rem] rounded-3xl border border-borderPurple outline-none px-4 py-2 focus:border-bodyPurple focus:outline-bodyPurple"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                isExisting && setIsExisting(false);
                setIsRegistered(false);
              }}
            />
            {!validator.isEmail(email) && email && errorMsg}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className=" flex justify-between">
              <p> Password </p>{" "}
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="pr-5 cursor-pointer"
              >
                {showPassword ? "👀" : "🔐"}
              </div>
            </label>
            <input
              className="h-[2.25rem] rounded-3xl border border-borderPurple outline-none px-4 py-2 focus:border-bodyPurple focus:outline-bodyPurple "
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsRegistered(false);
              }}
            />
            {!validator.isStrongPassword(password) && password && (
              <small className="text-darkPink text-[0.9rem] place-self-end pr-2 pt-2">
                Not strong enough (A-Z, a-z, 0-9, above 7,special charcters)
              </small>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="confirmPassword" className="text-[1.2rem] ">
              Confirm Password
            </label>
            <input
              className="h-[2.25rem] rounded-3xl border border-borderPurple outline-none px-4 py-2 focus:border-bodyPurple focus:outline-bodyPurple "
              type="password"
              name="confirm_password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setIsRegistered(false);
              }}
            />
            {confirmPassword && confirmPassword !== password && (
              <small className="text-darkPink text-[0.9rem] place-self-end pr-2">
                Passwords don't match
              </small>
            )}
          </div>

          <div className="my-4">
            {(confirmPassword.length > 1) & (password !== confirmPassword) ? (
              <p className="text-center text-darkPink font-bold text-[1.05rem]">
                Password mismatch
              </p>
            ) : isExisting ? (
              <p className="text-center text-darkPink font-bold text-[1.05rem]">
                Email already exists!
              </p>
            ) : isRegistered ? (
              <p className="text-center text-darkPink font-bold text-[1.05rem]">
                User Registered Successfully ✅
                <Link
                  to={"/login"}
                  className="beep text-base block mt-4 font-normal border bg-borderPurple border-borderPurple px-5 py-2 rounded-xl md:inline md:mt-0"
                >
                  Login ...
                </Link>
              </p>
            ) : (
              ""
            )}

            <button
              type="submit"
              className="bg-borderPurple py-3 rounded-3xl text-[1.1rem] w-full text-white transition-all duration-300 ease-in-out p-[0.3rem] mt-8 hover:border-darkPink hover:px-[0.4rem]  hover:text-[1.11rem] hover:opacity-90 active:border-darkPink focus:border-darkPink focus:outline-darkPink"
            >
              Register
            </button>
          </div>
          <p className="text-center text-[0.9rem] md:text-[1.1rem] ">
            Yes i have an account,{" "}
            <Link
              to={"/login"}
              className={`transition-all ease-in-out duration-300 hover:text-darkPink hover:font-semibold pl-1 `}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
