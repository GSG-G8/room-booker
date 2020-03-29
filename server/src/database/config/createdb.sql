CREATE DATABASE roombooker;
CREATE USER booker WITH superuser password '123abc';
ALTER DATABASE roombooker OWNER TO booker;
-- test db
CREATE DATABASE roombtest;
CREATE USER bookertest WITH superuser password '123cde';
ALTER DATABASE roombtest OWNER TO bookertest;
