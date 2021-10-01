async function login() {
  const correo = document.getElementById("correo").value
  const contraseña = document.getElementById("contraseña").value
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
    alert(JSON.stringify(parsedLogin))
    // localStorage.setItem("tokenUsuario", JSON.stringify(parsedLogin.token))
    // let tokenUsuario = await JSON.parse(localStorage.getItem('tokenUsuario'))
    // console.log(tokenUsuario)
  } catch(err) {
    throw new Error("Nombre o contraseña incorrectos")
  }
}