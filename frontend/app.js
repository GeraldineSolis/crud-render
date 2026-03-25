const API = "https://crud-render-g5u2.onrender.com/usuarios";

async function cargar() {
  const res = await fetch(API);
  const data = await res.json();

  lista.innerHTML = data.map(u => `
    <li>
      ${u.nombre} (${u.edad})
      <button onclick="eliminar(${u.id})">X</button>
    </li>
  `).join("");
}

async function crear() {
  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      nombre: nombre.value,
      email: email.value,
      edad: parseInt(edad.value)
    })
  });

  cargar();
}

async function eliminar(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  cargar();
}

cargar();