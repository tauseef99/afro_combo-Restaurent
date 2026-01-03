import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/admin/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        }
      );
    
      console.log("Login response:", response); //  
    
      // if (!response.data?.success) {
      //   throw new Error("Authentication failed");
      // }
    
      // setAuth(true);
      // navigate("/admin/dashboard", { replace: true });

      if (!response.data?.success) {
        throw new Error("Authentication failed");
      }
      
      localStorage.setItem("adminToken", true); // ✅ Save login flag
      
      setAuth(true);
      navigate("/admin/dashboard", { replace: true });
      
    
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = 
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check credentials and try again.";
      
      setError(errorMessage);
    }
    
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1 style={styles.heading}>Admin login </h1>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              style={styles.inputField}
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              name="password"
              style={styles.inputField}
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button 
            type="submit" 
            style={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #141E30, #243B55)",
    fontFamily: "'Poppins', sans-serif",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    marginBottom: "20px",
    color: "#2c3e50",
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  inputField: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
    outline: "none",
  },
  inputFieldFocus: {
    borderColor: "#007bff",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontWeight: "600",
  },
  submitBtnHover: {
    backgroundColor: "#0056b3",
  },
  errorMessage: {
    color: "#e74c3c",
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "15px",
  },
};

export default AdminLogin;
