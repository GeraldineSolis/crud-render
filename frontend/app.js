const API = "https://crud-render-g5u2.onrender.com/usuarios";

let idEditando = null;

async function cargar() {
  const res = await fetch(API);
  const data = await res.json();

  lista.innerHTML = data.map(u => `
    <li>
      ${u.nombre} (${u.edad})
      <button onclick="editar(${u.id}, '${u.nombre}', '${u.email}', ${u.edad})">Editar</button>
      <button onclick="eliminar(${u.id})">X</button>
    </li>
  `).join("");
}

async function crear() {
  const datos = {
    nombre: nombre.value,
    email: email.value,
    edad: parseInt(edad.value)
  };

  if (idEditando) {
    // UPDATE
    await fetch(API + "/" + idEditando, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    idEditando = null;
    btnGuardar.textContent = "Guardar";

  } else {
    // CREATE
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
  }

  nombre.value = "";
  email.value = "";
  edad.value = "";

  cargar();
}

function editar(id, nom, mail, ed) {
  nombre.value = nom;
  email.value = mail;
  edad.value = ed;

  idEditando = id;
  btnGuardar.textContent = "Actualizar";
}

async function eliminar(id) {
  await fetch(API + "/" + id, {
    method: "DELETE"
  });

  cargar();
}

cargar();
