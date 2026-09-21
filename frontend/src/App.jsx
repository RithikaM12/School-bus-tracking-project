import { useState, useEffect } from "react";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8082";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isSignUp, setIsSignUp] = useState(false);

  // Driver states
  const [isDriverMode, setIsDriverMode] = useState(false);
  const [driverLoggedIn, setDriverLoggedIn] = useState(false);
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [driverLoginError, setDriverLoginError] = useState("");
  const [driverShowPassword, setDriverShowPassword] =
    useState(false);

  const [parentName, setParentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const [busLocation, setBusLocation] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [students, setStudents] = useState([]);

  // Driver Dashboard states
  const [driverName, setDriverName] = useState("");
  const [driverBusId, setDriverBusId] = useState("1");
  const [driverLatitude, setDriverLatitude] = useState("");
  const [driverLongitude, setDriverLongitude] = useState("");
  const [driverMessage, setDriverMessage] = useState("");
  const [driverError, setDriverError] = useState("");

  // Get Bus Location and Notifications
  useEffect(() => {
    const fetchBusLocation = () => {
      fetch(`${API_URL}/bus-locations`)
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
          console.error(
            "Error fetching bus location:",
            error
          );
        });
    };

    fetchBusLocation();

    const locationInterval = setInterval(() => {
      fetchBusLocation();
    }, 10000);

    fetch(`${API_URL}/notifications`)
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
        console.error(
          "Error fetching notifications:",
          error
        );
      });

    return () => {
      clearInterval(locationInterval);
    };
  }, []);

  // Get Students for Logged-in Parent
  useEffect(() => {
    if (parentId === null) {
      return;
    }

    fetch(`${API_URL}/students/parent/${parentId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch student details"
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log("Parent Students:", data);
        setStudents(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching student details:",
          error
        );
      });
  }, [parentId]);

  // Parent Login
  const handleLogin = () => {
    setLoginError("");

    if (!email || !password) {
      setLoginError(
        "Please enter email and password"
      );
      return;
    }

    fetch(`${API_URL}/parents/login`, {
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
          throw new Error(
            "Invalid email or password"
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);

        if (!data) {
          throw new Error(
            "Invalid email or password"
          );
        }

        setParentId(data.parentId);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoginError(
          "Invalid email or password"
        );
      });
  };

  // Parent Sign Up
  const handleSignUp = () => {
    setSignUpError("");
    setSignUpMessage("");

    if (
      !parentName ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setSignUpError(
        "Please fill in all fields"
      );
      return;
    }

    if (password !== confirmPassword) {
      setSignUpError(
        "Passwords do not match"
      );
      return;
    }

    if (password.length < 6) {
      setSignUpError(
        "Password must contain at least 6 characters"
      );
      return;
    }

    fetch(`${API_URL}/parents/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentName: parentName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      }),
    })
      .then(async (response) => {
        const data = await response.text();

        if (!response.ok) {
          throw new Error(
            data || "Registration failed"
          );
        }

        return data;
      })
      .then((data) => {
        console.log(
          "Sign Up successful:",
          data
        );

        setSignUpMessage(
          "Account created successfully! Please sign in."
        );

        setParentName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error(
          "Sign Up error:",
          error
        );

        if (
          error.message.includes(
            "Email already registered"
          )
        ) {
          setSignUpError(
            "Email already registered"
          );
        } else {
          setSignUpError(
            "Registration failed. Please try again."
          );
        }
      });
  };

  // Driver Login
  const handleDriverLogin = () => {
    setDriverLoginError("");

    if (!driverEmail || !driverPassword) {
      setDriverLoginError(
        "Please enter email and password"
      );
      return;
    }

    fetch(`${API_URL}/drivers/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: driverEmail,
        password: driverPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Invalid driver email or password"
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(
          "Driver login successful:",
          data
        );

        if (!data) {
          throw new Error(
            "Invalid driver email or password"
          );
        }

        setDriverName(data.driverName || "");
        setDriverLoggedIn(true);
        setDriverLoginError("");
      })
      .catch((error) => {
        console.error(
          "Driver login error:",
          error
        );

        setDriverLoginError(
          "Invalid driver email or password"
        );
      });
  };

  // Driver Location Update
  const handleDriverLocationUpdate = () => {
    setDriverMessage("");
    setDriverError("");

    if (
      !driverName ||
      !driverBusId ||
      !driverLatitude ||
      !driverLongitude
    ) {
      setDriverError(
        "Please fill in all fields"
      );
      return;
    }

    const latitude = Number(driverLatitude);
    const longitude = Number(driverLongitude);
    const busId = Number(driverBusId);

    if (
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      setDriverError(
        "Latitude and longitude must be valid numbers"
      );
      return;
    }

    if (latitude < -90 || latitude > 90) {
      setDriverError(
        "Latitude must be between -90 and 90"
      );
      return;
    }

    if (
      longitude < -180 ||
      longitude > 180
    ) {
      setDriverError(
        "Longitude must be between -180 and 180"
      );
      return;
    }

    const locationData = {
      locationId: Date.now(),
      busId: busId,
      latitude: latitude,
      longitude: longitude,
    };

    fetch(`${API_URL}/bus-locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to update bus location"
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(
          "Location updated:",
          data
        );

        setBusLocation(data);

        setDriverMessage(
          "Bus location updated successfully!"
        );
      })
      .catch((error) => {
        console.error(
          "Location update error:",
          error
        );

        setDriverError(
          "Failed to update location. Please try again."
        );
      });
  };

  // OpenStreetMap URL
  const mapUrl = busLocation
    ? `https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=${busLocation.latitude}%2C${busLocation.longitude}`
    : "";

  // Driver Login Page
  if (isDriverMode && !driverLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1>Driver Login</h1>

          <p className="login-subtitle">
            School Bus Tracking System
          </p>

          <input
            type="email"
            placeholder="Driver Email"
            className="input-box"
            value={driverEmail}
            onChange={(e) =>
              setDriverEmail(e.target.value)
            }
          />

          <div className="password-container">
            <input
              type={
                driverShowPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              className="input-box"
              value={driverPassword}
              onChange={(e) =>
                setDriverPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="show-password-button"
              onClick={() =>
                setDriverShowPassword(
                  !driverShowPassword
                )
              }
            >
              {driverShowPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          {driverLoginError && (
            <p className="login-error">
              {driverLoginError}
            </p>
          )}

          <button
            className="login-button"
            onClick={handleDriverLogin}
          >
            Login
          </button>

          <button
            className="logout-button"
            onClick={() => {
              setIsDriverMode(false);
              setDriverEmail("");
              setDriverPassword("");
              setDriverLoginError("");
              setDriverShowPassword(false);
            }}
          >
            Back to Parent Login
          </button>
        </div>
      </div>
    );
  }

  // Driver Dashboard
  if (isDriverMode && driverLoggedIn) {
    return (
      <div
        className="dashboard"
        style={{
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <h1>Driver Dashboard</h1>

        <p>
          School Bus Tracking System
        </p>

        <div
          className="card"
          style={{
            maxWidth: "600px",
            margin: "30px auto",
          }}
        >
          <h2>🚍 Driver Details</h2>

          <p>
            <strong>Driver Name:</strong>{" "}
            {driverName}
          </p>

          <p>
            <strong>Bus ID:</strong>{" "}
            {driverBusId}
          </p>
        </div>

        <div
          className="card"
          style={{
            maxWidth: "600px",
            margin: "30px auto",
          }}
        >
          <h2>🚍 Update Bus Location</h2>

          <input
            type="number"
            placeholder="Bus ID"
            className="input-box"
            value={driverBusId}
            onChange={(e) =>
              setDriverBusId(e.target.value)
            }
          />

          <input
            type="number"
            step="any"
            placeholder="Latitude"
            className="input-box"
            value={driverLatitude}
            onChange={(e) =>
              setDriverLatitude(e.target.value)
            }
          />

          <input
            type="number"
            step="any"
            placeholder="Longitude"
            className="input-box"
            value={driverLongitude}
            onChange={(e) =>
              setDriverLongitude(e.target.value)
            }
          />

          {driverError && (
            <p className="login-error">
              {driverError}
            </p>
          )}

          {driverMessage && (
            <p className="success-message">
              {driverMessage}
            </p>
          )}

          <button
            className="login-button"
            onClick={
              handleDriverLocationUpdate
            }
          >
            Update Bus Location
          </button>
        </div>

        {busLocation && (
          <div
            className="card"
            style={{
              maxWidth: "600px",
              margin: "20px auto",
            }}
          >
            <h2>
              Current Bus Location
            </h2>

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

            <div
              style={{
                marginTop: "15px",
                width: "100%",
                height: "300px",
                overflow: "hidden",
                borderRadius: "12px",
              }}
            >
              <iframe
                title="Driver Bus Location Map"
                src={mapUrl}
                width="100%"
                height="300"
                style={{
                  border: "none",
                }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}

        <button
          className="logout-button"
          onClick={() => {
            setIsDriverMode(false);
            setDriverLoggedIn(false);
            setDriverEmail("");
            setDriverPassword("");
            setDriverName("");
            setDriverLatitude("");
            setDriverLongitude("");
            setDriverMessage("");
            setDriverError("");
            setDriverLoginError("");
          }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  // Parent Dashboard
  if (loggedIn) {
    return (
      <div className="dashboard">
        <h1>Parent Dashboard</h1>

        <p>
          Welcome to School Bus Tracking System
        </p>

        <div className="dashboard-cards">

          {/* Student Details */}
          <div className="card">
            <h2>Student Details</h2>

            {students.length > 0 ? (
              students.map((student) => (
                <div key={student.studentId}>
                  <p>
                    <strong>
                      Student Name:
                    </strong>{" "}
                    {student.studentName}
                  </p>

                  <p>
                    <strong>
                      Class:
                    </strong>{" "}
                    {student.className}
                  </p>

                  <p>
                    <strong>
                      Parent ID:
                    </strong>{" "}
                    {student.parentId}
                  </p>

                  <p>
                    <strong>
                      Bus ID:
                    </strong>{" "}
                    {student.busId}
                  </p>

                  <hr />
                </div>
              ))
            ) : (
              <p>
                No student details available.
              </p>
            )}
          </div>

          {/* Bus Location */}
          <div
            className="card"
            style={{
              minWidth: "350px",
            }}
          >
            <h2>Bus Location</h2>

            {busLocation ? (
              <>
                <p>
                  <strong>Bus ID:</strong>{" "}
                  {busLocation.busId}
                </p>

                <p>
                  <strong>
                    Latitude:
                  </strong>{" "}
                  {busLocation.latitude}
                </p>

                <p>
                  <strong>
                    Longitude:
                  </strong>{" "}
                  {busLocation.longitude}
                </p>

                {/* Live Map */}
                <div
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    height: "250px",
                    overflow: "hidden",
                    borderRadius: "12px",
                  }}
                >
                  <iframe
                    title="Live Bus Location Map"
                    src={mapUrl}
                    width="100%"
                    height="250"
                    style={{
                      border: "none",
                    }}
                    loading="lazy"
                  ></iframe>
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "10px",
                  }}
                >
                  📍 Live bus location
                  updates automatically
                </p>
              </>
            ) : (
              <p>
                Loading bus location...
              </p>
            )}
          </div>

          {/* Notifications */}
          <div className="card">
            <h2>Notifications</h2>

            {notifications.length > 0 ? (
              notifications.map(
                (notification) => (
                  <div
                    key={
                      notification.notificationId
                    }
                  >
                    <p>
                      🔔{" "}
                      {notification.message}
                    </p>
                  </div>
                )
              )
            ) : (
              <p>
                No notifications available
              </p>
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
            setBusLocation(null);
            setNotifications([]);
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // Sign Up Page
  if (isSignUp) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1>Create Account</h1>

          <p className="login-subtitle">
            Register as a Parent
          </p>

          <input
            type="text"
            placeholder="Parent Name"
            className="input-box"
            value={parentName}
            onChange={(e) =>
              setParentName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="input-box"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <div className="password-container">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              className="input-box"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="show-password-button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            className="input-box"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          {signUpError && (
            <p className="login-error">
              {signUpError}
            </p>
          )}

          {signUpMessage && (
            <p className="success-message">
              {signUpMessage}
            </p>
          )}

          <button
            className="login-button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          <p className="signup-text">
            Already have an account?{" "}
            <span
              className="signup-link"
              onClick={() => {
                setIsSignUp(false);
                setSignUpError("");
                setSignUpMessage("");
              }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Main Parent Login Page
  return (
    <div className="login-page">
      <div className="login-box">
        <h1>
          School Bus Tracking System
        </h1>

        <p className="login-subtitle">
          Parent Login
        </p>

        <input
          type="email"
          placeholder="Email"
          className="input-box"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <div className="password-container">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            className="input-box"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="button"
            className="show-password-button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        {loginError && (
          <p className="login-error">
            {loginError}
          </p>
        )}

        {/* Parent Login Button */}
        <button
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Driver Dashboard Button */}
        <button
          className="login-button"
          style={{
            marginTop: "10px",
          }}
          onClick={() => {
            setIsDriverMode(true);
            setDriverLoggedIn(false);
            setLoginError("");
            setDriverLoginError("");
          }}
        >
          Driver Dashboard
        </button>

        <p className="signup-text">
          Don't have an account?{" "}
          <span
            className="signup-link"
            onClick={() => {
              setIsSignUp(true);
              setLoginError("");
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;