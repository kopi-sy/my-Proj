import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OfficerLogin.css";

function OfficerLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login() {

  // Admin Login
  if (
    email === "admin@civicai.com" &&
    password === "admin123"
  ) {

    localStorage.setItem(
      "loggedOfficer",
      JSON.stringify({
        email,
        role: "admin"
      })
    );

   navigate("/dashboard", { replace: true });
    return;
  }

  let officerDepartment = "";

  if (
    email === "road@civicai.com" &&
    password === "admin123"
  ) {
    officerDepartment = "Road";
  }

  else if (
    email === "water@civicai.com" &&
    password === "admin123"
  ) {
    officerDepartment = "Water";
  }

  else if (
    email === "sanitation@civicai.com" &&
    password === "admin123"
  ) {
    officerDepartment = "Sanitation";
  }

  else if (
    email === "drainage@civicai.com" &&
    password === "admin123"
  ) {
    officerDepartment = "Drainage";
  }

  else if (
    email === "electrical@civicai.com" &&
    password === "admin123"
  ) {
    officerDepartment = "Electrical";
  }

  else {
    setError("Invalid Email or Password");
    return;
  }

  localStorage.setItem(
    "loggedOfficer",
    JSON.stringify({
      email,
      role: "officer",
      department: officerDepartment
    })
  );

  navigate("/dashboard");
}

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Civic AI</h1>

        <h2>Officer Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
    
        <button onClick={login}>
          Login
        </button>

        {error && (
          <p style={{color:"red"}}>
            {error}
          </p>
        )}

      </div>

    </div>
  );
}

export default OfficerLogin;