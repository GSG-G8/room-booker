INSERT INTO bookinguser
 (name, password, email, is_admin, is_active)
 VALUES
  ('Lina', '$2y$12$hHCpGzmqS58reqfbYa3gAOW/ilMl4kqGTV2rhtkf89ppdjC.p1BpG', 'lina@gazaskygeeks.com', False, True),
  ('Imad', '$2y$12$hHCpGzmqS58reqfbYa3gAOW/ilMl4kqGTV2rhtkf89ppdjC.p1BpG', 'amoodaa@gazaskygeeks.com', True, True),
  ('Alaa','$2y$12$hHCpGzmqS58reqfbYa3gAOW/ilMl4kqGTV2rhtkf89ppdjC.p1BpG', 'alaa@gazaskygeeks.com', False, True),
  ('Omar', '$2y$12$hHCpGzmqS58reqfbYa3gAOW/ilMl4kqGTV2rhtkf89ppdjC.p1BpG', 'omar@gazaskygeeks.com', False, False)
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
