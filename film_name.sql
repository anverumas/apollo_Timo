CREATE DATABASE film_database;

USE film_database;

CREATE TABLE films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT,
    genre VARCHAR(100),
    director VARCHAR(255),
    description TEXT
);

INSERT INTO films (title, year, genre, director, description)
VALUES

('The Shawshank Redemption', 1994, 'Drama', 'Frank Darabont',
 'Two imprisoned men form a friendship over many years.'),

('The Godfather', 1972, 'Crime', 'Francis Ford Coppola',
 'The aging patriarch of an organized crime dynasty transfers control of his empire.'),

('The Dark Knight', 2008, 'Action', 'Christopher Nolan',
 'Batman faces a criminal mastermind known as the Joker.'),

('Pulp Fiction', 1994, 'Crime', 'Quentin Tarantino',
 'Several interconnected stories unfold in Los Angeles.'),

('Inception', 2010, 'Sci-Fi', 'Christopher Nolan',
 'A skilled thief enters peoples dreams to steal information.'),

('Interstellar', 2014, 'Sci-Fi', 'Christopher Nolan',
 'Explorers travel through a wormhole in search of a new home for humanity.'),

('The Matrix', 1999, 'Sci-Fi', 'The Wachowskis',
 'A hacker discovers that reality is not what it seems.'),

('Forrest Gump', 1994, 'Drama', 'Robert Zemeckis',
 'The life story of a man who experiences several major historical events.'),

('Gladiator', 2000, 'Action', 'Ridley Scott',
 'A Roman general seeks revenge after being betrayed.'),

('The Lord of the Rings: The Fellowship of the Ring', 2001, 'Fantasy',
 'Peter Jackson',
 'A hobbit begins a journey to destroy a powerful ring.');
