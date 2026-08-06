CREATE DATABASE school_bus_tracking;
USE school_bus_tracking;
SHOW TABLES;
CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);
CREATE TABLE parent (
    parent_id INT AUTO_INCREMENT PRIMARY KEY,
    parent_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100),
    password VARCHAR(100)
);
CREATE TABLE driver (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    license_no VARCHAR(50),
    password VARCHAR(100)
);
CREATE TABLE bus (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    bus_number VARCHAR(20) NOT NULL,
    route_name VARCHAR(100),
    capacity INT
);
CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    class_name VARCHAR(20),
    parent_id INT,
    bus_id INT,
    FOREIGN KEY (parent_id) REFERENCES parent(parent_id),
    FOREIGN KEY (bus_id) REFERENCES bus(bus_id)
);
CREATE TABLE route (
    route_id INT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(100),
    start_location VARCHAR(100),
    end_location VARCHAR(100)
);
CREATE TABLE bus_location (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    bus_id INT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    updated_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bus_id) REFERENCES bus(bus_id)
);
CREATE TABLE notification (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT,
    message VARCHAR(255),
    sent_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES parent(parent_id)
);
INSERT INTO admin (username, password, email)
VALUES ('admin', 'admin123', 'admin@school.com');
INSERT INTO parent (parent_name, phone, email, password)
VALUES
('Ravi', '9876543210', 'ravi@gmail.com', 'ravi123'),
('Kumar', '9876543211', 'kumar@gmail.com', 'kumar123');
INSERT INTO driver (driver_name, phone, license_no, password)
VALUES
('Suresh', '9876543222', 'TN123456789', 'driver123');
INSERT INTO bus (bus_number, route_name, capacity)
VALUES
('TN30AB1234', 'Salem Route', 40);
INSERT INTO student (student_name, class_name, parent_id, bus_id)
VALUES
('Arjun', 'III-A', 1, 1),
('Priya', 'III-B', 2, 1);
INSERT INTO route (route_name, start_location, end_location)
VALUES
('Salem Route', 'Salem New Bus Stand', 'School Campus');
INSERT INTO bus_location (bus_id, latitude, longitude)
VALUES
(1, 11.6643, 78.1460);
INSERT INTO notification (parent_id, message)
VALUES
(1, 'Bus has started from Salem'),
(2, 'Bus is arriving in 5 minutes');
SELECT * FROM admin;
SELECT * FROM parent;
SELECT * FROM driver;
SELECT * FROM bus;
SELECT * FROM student;
SELECT * FROM route;
SELECT * FROM bus_location;
SELECT * FROM notification;