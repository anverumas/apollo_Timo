CREATE TABLE day_date (
    id INT PRIMARY KEY AUTO_INCREMENT,
    day VARCHAR(20) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE films_show (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filmname VARCHAR(100) NOT NULL,
    genre VARCHAR(100),
    duration INT,
    age_rating VARCHAR(10),
    description TEXT
);

CREATE TABLE cinema_halls (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hall_name VARCHAR(50) NOT NULL,
    seats INT NOT NULL
);

CREATE TABLE working_hours (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    work_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    salary DECIMAL(10, 2),
    hire_date DATE
);

CREATE TABLE showtimes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    film_id INT NOT NULL,
    hall_id INT NOT NULL,
    show_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    price DECIMAL(6, 2) NOT NULL,

    FOREIGN KEY (film_id) REFERENCES films_show(id),
    FOREIGN KEY (hall_id) REFERENCES cinema_halls(id)
);

CREATE TABLE tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    showtime_id INT NOT NULL,
    seat_number INT NOT NULL,
    customer_name VARCHAR(100),
    customer_email VARCHAR(150),
    price DECIMAL(6, 2) NOT NULL,

    FOREIGN KEY (showtime_id) REFERENCES showtimes(id)
);