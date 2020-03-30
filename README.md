# room-booker

### Problem
Gaza sky Geeks (GSG) has many rooms and many staff members with the ability to book any room but there is no way to know who booked what

### Solution
An app to manage reserving GSG rooms

### User journey
Any GSG staff member can book any available room and get notified about his reservation via an calender event.

### User stories
- As a user, I can sign up with my GSG email (@gazaskygeeks.com) and the admin will approve via dashboard 
- As a user, I can sign in 
- As a user, I can see the rooms and their bookings and who booked them
- As a user, I can book an available room per business hours and i will get a calendar invitation so that i dont forget what i booked
- As a user, I can cancel my booking.
- As a user, I can change my password and display name.
- As a user, I will receive a calendar invitation about my booking time
- As an admin, I can cancel any booking.
- As an admin, I can change the business hours.
- As an admin, I can add new rooms, edit info about the room, or delete existing ones.
- As an admin, I can delete members.

#### Stretch: 
- As a user, I can sign up with my GSG email (@gazaskygeeks.com) and receive an email verification to ensure the email is valid [principle of email verification](https://stackoverflow.com/questions/39092822/how-to-do-confirm-email-address-with-express-node/39093058) 
- As a user, I can edit my booking ( low priority )

### Tech Stack
- Front:
    - React
    - React Router
    - Ant design
    - FullCalendar // event calendar
- Back:
    - Express
    - PostgreSQL / pg
    - @hapi/boom
    - @hapi/joi
    - jest supertest