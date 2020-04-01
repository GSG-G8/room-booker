INSERT INTO bookinguser
 (name, password, email, is_admin, is_active)
 VALUES
  ('Lina', '$2b$10$lT17vapkQ4VF1BRSMnfSDuHTfdO7wCCnhVwpeyZklQcNkicGQiz/C', 'lina@gazaskygeeks.com', False, True),
  ('Imad', '$2b$10$lT17vapkQ4VF1BRSMnfSDuHTfdO7wCCnhVwpeyZklQcNkicGQiz/C', 'amoodaa@gazaskygeeks.com', True, True),
  ('Alaa','$2b$10$lT17vapkQ4VF1BRSMnfSDuHTfdO7wCCnhVwpeyZklQcNkicGQiz/C', 'alaa@gazaskygeeks.com', False, True),
  ('Omar', '$2b$10$lT17vapkQ4VF1BRSMnfSDuHTfdO7wCCnhVwpeyZklQcNkicGQiz/C', 'omar@gazaskygeeks.com', False, False)
;

INSERT INTO room
  (name)
VALUES
  ('Jerusalem'),
  ('Roma'),
  ('Tokyo'),
  ('Madrid'),
  ('Istanbul');

INSERT INTO booking
  (room_id, user_id, start_time, end_time, description)
VALUES
  (1, 1, '2020-04-05 10:00:00', '2020-04-05 11:00:00','meeting'),
  (1, 2, '2020-04-05 09:00:00', '2020-04-05 09:15:00','meeting'),
  (3, 1, '2020-04-05 10:00:00', '2020-04-05 12:00:00','meeting'),
  (2, 2, '2020-04-05 10:00:00', '2020-04-05 11:00:00','meeting')
;
