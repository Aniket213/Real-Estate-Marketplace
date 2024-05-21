import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Signin() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signinhandler = e => {
    e.preventDefault();
    // console.log("Signined");
    axios.post('http://localhost:8000/backend/auth/signin', formdata)
    .then(res=>{
      // console.log("Inside axios then, here's the data : ", formdata);
      navigate('/');
    })
    .catch(err=>{
      console.log(err);
    })
  };

  return (
    <div className="max-w-lg m-auto mt-20">
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={signinhandler} className="flex flex-col gap-4">
        <input type="text" value={formdata.username} onChange={e=>{setformdata({...formdata, username: e.target.value})}} name="" id="" placeholder='Username' className='p-3 border rounded-lg focus:placeholder:text-transparent'/>
        <input type="email" value={formdata.email} onChange={e=>{setformdata({...formdata, email: e.target.value})}} name="" id="" placeholder='Email' className='p-3 border rounded-lg focus:placeholder:text-transparent'/>
        <input type="password" value={formdata.password} onChange={e=>{setformdata({...formdata, password: e.target.value})}} name="" id="" placeholder='Password' className='p-3 border rounded-lg focus:placeholder:text-transparent'/>
        <button type="submit" className="bg-slate-700 hover:bg-slate-500 text-white uppercase font-semibold p-4 rounded-lg disabled:opacity-80">SignIn</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account ?</p>
          <NavLink to={"/login"}>
            <span className='text-blue-700'>Login</span>
          </NavLink>
      </div>
    </div>
  )
}
