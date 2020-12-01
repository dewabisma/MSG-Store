import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@msgstore.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Bisma',
    email: 'bisma@dummy.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Cutiepie',
    email: 'cutiepie@dummy.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
