import React from "react";
import { useRef } from "react";
import axios from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate()
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstValue = firstNameDom.current.value;
    const lastValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
  
    if (!usernameValue || !firstValue || !lastValue || !emailValue || !passValue) {
        alert("Please provide all the required information");
        return;
      }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register sucessfull, please login")
      navigate('/login');
    } catch (error) {
        alert('something went wrong!');
      console.log(error.response);
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Username :----</span>
          <input ref={userNameDom} type="text" placeholder="user name" />
        </div>
        <br />
        <div>
          <span>First name :--- </span>
          <input ref={firstNameDom} type="text" placeholder="first name" />
        </div>
        <br />
        <div>
          <span>last name :--- </span>
          <input ref={lastNameDom} type="text" placeholder="last name" />
        </div>
        <br />
        <div>
          <span>email :--- </span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>password :--- </span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to={"/login"}>Login</Link>
    </section>
  );
}

export default Register;
