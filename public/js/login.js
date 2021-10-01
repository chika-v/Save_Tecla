async function login() {
  const correo = document.getElementById("correo").value
  const contraseña = document.getElementById("contraseña").value
  console.log(correo)
  try { 
    const makeLogin = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {"Content-type": "application/json;charset=UTF-8"},
      body: JSON.stringify({
        correo,
        contraseña
      })
    });
    const parsedLogin = await makeLogin.json()
    console.log(parsedLogin)
    if (parsedLogin.success) {
      return window.location.href = '/inicio'
    } else {
      alert("Nombre o contraseña incorrectos")
    }
  } catch(err) {
    console.log(err)
    throw new Error("Nombre o contraseña incorrectos")
  }
}