# table init
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';
FLUSH PRIVILEGES;

use wichtel;

# users table
CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY ,
  name VARCHAR(100),
  email VARCHAR(100)
);

# populate users table
INSERT into users(name, email) VALUES
('Jochen', null),
('Maike', null),
('Michael', 'happel.michael@gmail.com'),
('Olaya', 'olaya_ros@hotmail.com'),
('Jonathan', null),
('Dana', null),
('Jessica', null),
('Dennis', null),
('Miriam', null),
('Josia', null),
('Becky', null);
