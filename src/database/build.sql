BEGIN;

DROP TABLE IF EXISTS CARS, users CASCADE;




CREATE TABLE CARS(
  id SERIAL PRIMARY KEY,
  name VARCHAR(1000) NOT NULL,
  miles_per_gallon FLOAT,
  cylinders FLOAT NOT NULL,
  displacement FLOAT NOT NULL,
  horsepower FLOAT,
  weight_in_lbs FLOAT NOT NULL,
  acceleration FLOAT NOT NULL,
  year TEXT NOT NULL,
  origin VARCHAR(1000) NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(1000) NOT NULL,
  password VARCHAR(1000) NOT NULL

);


COMMIT;
