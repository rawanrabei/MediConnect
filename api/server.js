import jsonServer from 'json-server';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const stripPassword = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

server.post('/auth/login', (req, res) => {
  const { email, password, role } = req.body || {};
  const db = router.db;
  const user = db.get('users').find({ email, role }).value();

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email, password, or role.' });
  }

  return res.json({
    user: stripPassword(user),
    token: `token-${user.id}`,
  });
});

server.post('/auth/register', (req, res) => {
  const { name, email, password, role = 'patient' } = req.body || {};
  const db = router.db;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existing = db.get('users').find({ email, role }).value();
  if (existing) {
    return res.status(409).json({ message: 'An account with this email and role already exists.' });
  }

  const id = role === 'doctor' ? `doctor-user-${Date.now()}` : `patient-${Date.now()}`;
  const newUser = {
    id,
    name,
    email,
    password,
    role,
    status: 'active',
    createdAt: new Date().toISOString(),
    ...(role === 'patient'
      ? { phone: '', dateOfBirth: '', gender: '' }
      : { doctorId: 1, phone: '' }),
  };

  db.get('users').push(newUser).write();

  return res.status(201).json({
    user: stripPassword(newUser),
    token: `token-${newUser.id}`,
  });
});

server.use(router);

const PORT = process.env.API_PORT || 3001;
server.listen(PORT, () => {
  console.log(`MediConnect API running at http://localhost:${PORT}`);
});
