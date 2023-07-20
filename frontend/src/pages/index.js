import React, { useContext, useState,useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [logging,setLogging] = useState(true)

  async function Loginnow() {
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      });
      console.log("account Logged in");
      console.log(res);
      console.log(process.env.TEXT)
      router.push("/main");
     
    } catch (error) {
      console.log(error);
      console.log(process.env.TEXT)
      console.log("signing in is not successful");
    }
  }

  async function Signup() {
    try {
      if(password==rePassword){
        const res = await axios.post("http://localhost:3001/auth/signup", {
        username: username,
        password: password,
      });
      console.log("account created");
      console.log(res);
      router.push("/main");
      }else{
        console.log('passwords dont match')
      }
     
    } catch (error) {
      console.log(error);
      console.log("Account is not created");
    }
  }
  function logOrSign(){
    return (

      setLogging(!logging))

  }
  


  return (
    <div className="bg-image bg-cover bg-center h-screen flex flex-col items-center">
      <div className="text-center mt-10">
      <h1 className="text-white text-4xl mb-3 ">Login Page</h1>
     <div className="text-center justify-center">
     <input
     placeholder="Username"
  type="text"
  onChange={(e) => setUsername(e.target.value)}
  className="border border-gray-300 rounded-md p-2 w-64 h-10 mb-2"
/>
<input
  placeholder="Password"
  type="password"
  onChange={(e) => setPassword(e.target.value)}
  className="border border-gray-300 rounded-md p-2 w-64 h-10 mb-2"
/>
<input
  
  placeholder="Retype Password"
  type="password"
  onChange={(e) => setRePassword(e.target.value)}
  className= {logging?"hidden border border-gray-300 rounded-md p-2 w-64 h-10 mb-2":" border border-gray-300 rounded-md p-2 w-64 h-10 mb-2"}
/>
<button
  onClick={logging?Loginnow:Signup}
  className="bg-red-500 text-white py-2 px-12 rounded w-64 h-10 hover:bg-red-400"
>
{logging?'Sign In':'Sign Up'}
</button>
<h2 className="text-slate-50">{logging?"Don't have an Account?":'Already have an Account?'} <span onClick={logOrSign} className=" mx-1 underline cursor-pointer hover:text-red-500">{logging?'Sign Up':'Log In'}</span></h2>
     </div>
      </div>

       
    </div>
  );
}
