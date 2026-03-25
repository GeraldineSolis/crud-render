-- insertar
INSERT INTO usuarios(nombre, email, edad)
VALUES ($1, $2, $3)
RETURNING *;

-- listar
SELECT * FROM usuarios;

-- actualizar
UPDATE usuarios
SET nombre = $1, email = $2, edad = $3
WHERE id = $4
RETURNING *;

-- eliminar
DELETE FROM usuarios WHERE id = $1;