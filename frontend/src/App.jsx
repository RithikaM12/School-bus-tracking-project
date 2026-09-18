import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [loginError, setLoginError] = useState("");

  const [busLocation, setBusLocation] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [students, setStudents] = useState([]);

  // Get Bus Location and Notifications
  useEffect(() => {

    // Get Bus Location
    fetch("http://localhost:8082/bus-locations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bus location");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Bus Location:", data);

        if (data.length > 0) {
          setBusLocation(data[data.length - 1]);
        }
      })
      .catch((error) => {
        console.error("Error fetching bus location:", error);
      });

    // Get Notifications
    fetch("http://localhost:8082/notifications")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Notifications:", data);
        setNotifications(data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });

  }, []);

  // Get Students for Logged-in Parent
  useEffect(() => {

    if (parentId === null) {
      return;
    }

    fetch(`http://localhost:8082/students/parent/${parentId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch student details");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Parent Students:", data);
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      });

  }, [parentId]);

  // Parent Login
  const handleLogin = () => {

    setLoginError("");

    if (!email || !password) {
      setLoginError("Please enter email and password");
      return;
    }

    fetch("http://localhost:8082/parents/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error("Invalid email or password");
        }

        return response.json();
      })
      .then((data) => {

        console.log("Login successful:", data);

        // Check if parent exists
        if (!data) {
          throw new Error("Invalid email or password");
        }

        // Save logged-in parent's ID
        setParentId(data.parentId);

        // Open dashboard
        setLoggedIn(true);

      })
      .catch((error) => {

        console.error("Login error:", error);
        setLoginError("Invalid email or password");

      });
  };

  // Parent Dashboard
  if (loggedIn) {
    return (
      <div className="dashboard">

        <h1>Parent Dashboard</h1>

        <p>Welcome to School Bus Tracking System</p>

        <div className="dashboard-cards">

          {/* Student Details */}
          <div className="card">
            <h2>Student Details</h2>

            {students.length > 0 ? (
              students.map((student) => (
                <div key={student.studentId}>

                  <p>
                    <strong>Student Name:</strong>{" "}
                    {student.studentName}
                  </p>

                  <p>
                    <strong>Class:</strong>{" "}
                    {student.className}
                  </p>

                  <p>
                    <strong>Parent ID:</strong>{" "}
                    {student.parentId}
                  </p>

                  <p>
                    <strong>Bus ID:</strong>{" "}
                    {student.busId}
                  </p>

                  <hr />

                </div>
              ))
            ) : (
              <p>Loading student details...</p>
            )}

          </div>

          {/* Bus Location */}
          <div className="card">

            <h2>Bus Location</h2>

            {busLocation ? (
              <>
                <p>
                  <strong>Bus ID:</strong>{" "}
                  {busLocation.busId}
                </p>

                <p>
                  <strong>Latitude:</strong>{" "}
                  {busLocation.latitude}
                </p>

                <p>
                  <strong>Longitude:</strong>{" "}
                  {busLocation.longitude}
                </p>
              </>
            ) : (
              <p>Loading bus location...</p>
            )}

          </div>

          {/* Notifications */}
          <div className="card">

            <h2>Notifications</h2>

            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.notificationId}>

                  <p>
                    🔔 {notification.message}
                  </p>

                </div>
              ))
            ) : (
              <p>No notifications available</p>
            )}

          </div>

        </div>

        {/* Logout */}
        <button
          className="logout-button"
          onClick={() => {
            setLoggedIn(false);
            setParentId(null);
            setEmail("");
            setPassword("");
            setStudents([]);
          }}
        >
          Logout
        </button>

      </div>
    );
  }

  // Login Page
  return (
    <div className="login-page">

      <div className="login-box">

        <h1>School Bus Tracking System</h1>

        <input
          type="text"
          placeholder="Email"
          className="input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {loginError && (
          <p className="login-error">
            {loginError}
          </p>
        )}

        <button
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default App;