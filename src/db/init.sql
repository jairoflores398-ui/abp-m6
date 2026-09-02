CREATE DATABASE abp_m6;

\c abp_m6;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  total NUMERIC(10,2) NOT NULL,
  estado VARCHAR(50) NOT NULL DEFAULT 'pendiente',
  user_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO usuarios (firstname, lastname, email, password_hash)
VALUES
  ('Ana', 'García', 'ana.garcia@example.com', 'hash_ana'),
  ('Luis', 'Pérez', 'luis.perez@example.com', 'hash_luis'),
  ('María', 'López', 'maria.lopez@example.com', 'hash_maria');

INSERT INTO pedidos (total, estado, user_id)
VALUES
  (1500.00, 'pendiente', 1),
  (2200.50, 'pagado', 2),
  (980.75, 'enviado', 3);
