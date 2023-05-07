import React, { useEffect, useState } from "react";
import "./Login.css";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, login, signup } from "../actions/userAction";
import Loader from "../styledComponents/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signInTab, setSignInTab] = useState("container active");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const submitHandlerSignup = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("firstName", firstName);
    myForm.append("lastName", lastName);
    myForm.append("occupation", occupation);
    myForm.append("country", country);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("confirmPassword", confirmPassword);
    myForm.append("avatar", avatar);
    dispatch(signup(myForm));
  };

  const submitHandlerLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const toggle = (e) => {
    e.preventDefault();
    if (signInTab === "container") {
      setSignInTab("container active");
    } else {
      setSignInTab("container");
    }
  };

  const setAvatarHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated === true) {
      navigate("/home");
    }
  }, [error, isAuthenticated, navigate, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section>
          <Toaster position="top-center" reverseOrder={false} />
          <div className={signInTab}>
            <div className="user signinBx">
              <div className="imgBx">
                <img
                  src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
                  alt=""
                />
              </div>
              <div className="formBx">
                <form onSubmit={submitHandlerLogin}>
                  <h2>Sign In</h2>
                  <input
                    type="email"
                    value={loginEmail}
                    required
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                    }}
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    value={loginPassword}
                    required
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                    }}
                    placeholder="Password"
                  />
                  <input type="submit" defaultValue="Login" />
                  <p className="signup">
                    Don't have an account ?
                    <button onClick={toggle}> Sign Up.</button>
                  </p>
                </form>
              </div>
            </div>
            <div className="user signupBx">
              <div className="formBx">
                <form onSubmit={submitHandlerSignup}>
                  <h2>Create an account</h2>
                  <div className="xx">
                    <input
                      type="text"
                      className="halfinput"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      className="halfinput"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="xx">
                    <input
                      type="text"
                      className="halfinput"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Country"
                    />
                    <input
                      type="text"
                      className="halfinput"
                      required
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      placeholder="Occupation"
                    />
                  </div>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create Password"
                  />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                  <input
                    type="file"
                    name="avatar"
                    onChange={setAvatarHandler}
                    accept="image/*"
                  />
                  <div className="xx">
                    <input type="submit" defaultValue="Sign Up" />
                    <button className="forgotpass"> Forgot Password ? </button>
                  </div>
                  <p className="signup">
                    Already have an account ?
                    <button onClick={toggle}>Sign in.</button>
                  </p>
                </form>
              </div>
              <div className="imgBx">
                <img
                  src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
