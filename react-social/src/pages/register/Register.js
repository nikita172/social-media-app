import { useRef } from "react";
import "./register.css";
import axios from "axios"
import {useNavigate} from "react-router"

export default function Register() {
  const navigate = useNavigate()
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const handleClick = async(e) => {
    e.preventDefault()
    if(passwordAgain.current.value!==password.current.value){
      passwordAgain.current.setCustomValidity("passwords do not match! ")
    }else{
      const user ={
        username: username.current.value,
        email:email.current.value,
        password :password.current.value,
      };
      try {
        await axios.post("/auth/register", user)
        navigate("/login")
      }
      catch(err){
        console.log(err)
      }
      }
    }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" type="email" ref={email} required className="loginInput" />
            <input placeholder="Password" type="password" required ref={password} minLength='6' className="loginInput" />
            <input placeholder="Password Again" type="password" required  ref={passwordAgain} className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
