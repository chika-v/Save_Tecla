async function login() {
  const usuario = document.getElementById("usuario").value
  const contraseña = document.getElementById("contraseña").value
  console.log(usuario)
  try { 
    const makeLogin = await fetch('http://localhost:3000/ingresar', {
      method: 'POST',
      headers: {"Content-type": "application/json;charset=UTF-8"},
      body: JSON.stringify({
        usuario,
        pass: contraseña
      })
    });
    const parsedLogin = await makeLogin.json()
    console.log(parsedLogin)
    if (parsedLogin.token) {
      return window.location.href = '/inicio'
    } else {
      alert("Nombre o contraseña incorrectos")
    }
  } catch(err) {
    console.log(err)
    throw new Error("Nombre o contraseña incorrectos")
  }
}