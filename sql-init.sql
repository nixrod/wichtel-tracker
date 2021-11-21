ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';
flush privileges;

CREATE TABLE wichtel.users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    address TEXT,
    wishes TEXT,
    access_id VARCHAR(100)
);

CREATE TABLE wichtel.assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    giver_id INT,
    receiver_id INT
);

CREATE TABLE wichtel.state (
    id INT PRIMARY KEY AUTO_INCREMENT,
    state VARCHAR(100)
);

INSERT INTO wichtel.state (state) VALUES ('WISHES_OPEN');
