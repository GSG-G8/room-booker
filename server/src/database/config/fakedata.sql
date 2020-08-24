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
  (room_id, user_id, bookingtype_id, start_time, end_time, title, description,noOfPeople)
VALUES
  (1, 1, 1, '2020-04-14 09:00:00', '2020-04-14 11:00:00','meeting', 'codeacademy meetings',7),
  (1, 2, 2, '2020-04-14 11:00:00', '2020-04-14 12:00:00','meeting', 'codeacademy meetings',6),
  (1, 1, 3, '2020-04-14 14:00:00', '2020-04-14 14:30:00','meeting', 'codeacademy meetings',3),
  (1, 2, 1, '2020-04-14 16:00:00', '2020-04-14 17:00:00','meeting', 'codeacademy meetings',4),
  (2, 2, 2, '2020-04-14 16:00:00', '2020-04-14 17:00:00','meeting', 'codeacademy meetings',0)
;
