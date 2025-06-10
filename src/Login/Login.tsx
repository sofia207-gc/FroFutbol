import type React from "react";
import { useState } from "react";


const Login : React.FC = () =>{
  const [email,setEmail]= useState("");
  const [contraseña,setContraseña]= useState("");
  const enviardatos = async (event: React.FormEvent) =>{
    event.preventDefault();
   const res= await fetch("http://localhost:2530/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: contraseña
        })
    })
    const data = await res.json();
    if (data.msj == "Inicio de sesion correcto"){
        localStorage.setItem("email",email);
        localStorage.setItem("contraseña",contraseña);
        localStorage.setItem("auth",'true');
    }
    console.log(data);
   
  }

    return(
        <div className="login">
        <h2>INICIAR SESION</h2>
        <form onSubmit={enviardatos}>
            <input placeholder="escriba el gmail" onChange={(event)=> setEmail(event.target.value)}></input>
            <input placeholder="escriba el password" onChange={(event)=> setContraseña (event.target.value)}></input>
            <button type="submit">INGRESAR</button>
            <a>REGISTRASE</a>
        </form>
        </div>
    )
}

export default Login;