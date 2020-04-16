BEGIN;

DROP TABLE IF EXISTS bookinguser , booking , businessHours , room CASCADE;

CREATE TABLE bookinguser (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT FALSE,
	is_active BOOLEAN NOT NULL DEFAULT FALSE,
	date_created DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE room (
	id SERIAL PRIMARY KEY ,
	name VARCHAR(255) NOT NULL,
	date_created DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE booking (
	id SERIAL PRIMARY KEY ,
	room_id INTEGER NOT NULL REFERENCES room(id),
	user_id INTEGER NOT NULL REFERENCES bookinguser(id),
	start_time TIMESTAMP NOT NULL,
	end_time TIMESTAMP NOT NULL,
	title TEXT NOT NULL,
	description TEXT NOT NULL,
	date_created DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE businessHours (
	daysOfWeek INTEGER[] NOT NULL,
	startTime VARCHAR(8) NOT NULL,
	endTime VARCHAR(8) NOT NULL
);

INSERT INTO businessHours
	(daysOfWeek, startTime, endTime)
VALUES
	('{1, 2, 3, 4}', '10:00', '18:00')
;

COMMIT;
