import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import port from "./../data/port.json";

//signInData, onChangeSignInData 만들어야함
const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //로그인 입력시 STATE 변화시키는 함수
  const onChangeSignInData = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const onClickLoginButton = () => {
    if (signInData.email === "") {
      alert("이메일을 입력해주세요.");
      $("#email").focus();
      return;
    }

    if (signInData.password === "") {
      alert("비밀번호를 입력해주세요.");
      $("#password").focus();
      return;
    }

    sendSignInData()
      .then((res) => {
        if (res.data.status) {
          setCookie("userData", res.data, { path: "/" });
          alert("로그인이 완료되었습니다.");
          navigate("/");
        } else {
          alert("아이디나 비밀번호가 틀렸습니다.");
        }
      })
      .catch((e) => {
        setErrorMessage(e.response.data.fail);
      });
  };

  const sendSignInData = async () => {
    return await axios.post(port.url + "/api/users/login", signInData);
  };

  return (
    <div>
      <div
        className="album"
        style={{
          paddingTop: 100 + "px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: 200 + "px",
        }}
      >
        {" "}
        <div>
          <h1 style={{ textAlign: "center" }}>LOGIN</h1>
          <p>Login and use AI CLOSET!</p>
        </div>
        <div
          className="container"
          style={{ width: 30 + "%", minWidth: 300 + "px" }}
        >
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={signInData.email}
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="abc@example.com"
                onChange={onChangeSignInData}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={signInData.password}
                className="form-control"
                id="password"
                name="password"
                onChange={onChangeSignInData}
              />
            </div>
            <button
              type="button"
              onClick={onClickLoginButton}
              className="btn btn-primary"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
              className="btn btn-success"
              style={{ marginLeft: 3 + "px" }}
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
