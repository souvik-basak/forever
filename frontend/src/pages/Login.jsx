import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Log In");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(currentState);
    try {
      if (currentState === "login") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
          console.log(response.data);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
          console.log(response.data);
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Log In" ? (
        ""
      ) : (
        <input
          required
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border border-gray-800 rounded py-2 px-3 w-full"
        />
      )}
      <input
        required
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email Address"
        className="border border-gray-800 rounded py-2 px-3 w-full"
      />
      <input
        required
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="border border-gray-800 rounded py-2 px-3 w-full"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forget Password?</p>
        {currentState === "Log In" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Log In")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white py-2 px-8 rounded-sm font-light">
        {currentState === "Log In" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
