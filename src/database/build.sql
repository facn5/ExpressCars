BEGIN;

DROP TABLE IF EXISTS cars, users CASCADE;

CREATE TABLE CARS(
  id SERIAL PRIMARY KEY,
  type VARCHAR(1000) NOT NULL,
  price INTEGER NOT NULL,
  manufacturer VARCHAR(1000) NOT NULL

);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(1000) NOT NULL,
  password VARCHAR(1000) NOT NULL

);

INSERT INTO users( username, password ) VALUES
('karam1ashqar', '$2a$10$.tanz/Usv/ZfcNAPxj1MFe9kr2yA9DXCugWPHPeul715GepiUvaDS');

INSERT INTO cars (type, price, manufacturer) VALUES
('Coupes', 12300, 'BMW' ),
('Sedans', 20100, 'MAZDA'),
('Trucks', 87000, 'VOLVO'),
('Sport Cars',320000 , 'CORVETTE'),
('Convertibles', 150000, 'Mercedes BENZ'),
('Crossovers', 30000, 'Chevrlote');


COMMIT;
