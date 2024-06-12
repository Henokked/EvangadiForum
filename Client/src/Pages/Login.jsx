import React, { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all the required information");
      return;
    }

    try {
        
     const {data} = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("Login successful");
      localStorage.setItem('token', data.token)
      navigate("/");
    console.log(data)
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Email: </span>
          <input ref={emailDom} type="email" placeholder="Email" required />
        </div>
        <br />
        <div>
          <span>Password: </span>
          <input ref={passwordDom} type="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={"/register"}>Register</Link>
    </section>
  );
}

export default Login;
