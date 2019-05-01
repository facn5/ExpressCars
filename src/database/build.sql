BEGIN;

DROP TABLE IF EXISTS users CASCADE;




CREATE TABLE IF NOT EXISTS CARS(
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

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(1000) NOT NULL,
  password VARCHAR(1000) NOT NULL

);

INSERT INTO users( username, password ) VALUES
('karam1ashqar', '$2a$10$.tanz/Usv/ZfcNAPxj1MFe9kr2yA9DXCugWPHPeul715GepiUvaDS');


COMMIT;
