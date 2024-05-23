import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userslice';
import OAuth from '../components/OAuth';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state)=>state.user);
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signuphandler = e => {
    e.preventDefault();
    dispatch(signInStart());
    axios.post('http://localhost:8000/backend/auth/signin', formdata)
    .then(res=>{
      dispatch(signInSuccess(res.data));
      navigate('/login');
    })
    .catch(err=>{
      dispatch(signInFailure(err.message));
    })
  };

  return (
    <div className="max-w-lg m-auto mt-20">
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={signuphandler} className="flex flex-col gap-4">
        <input type="text" value={formdata.username} onChange={e=>{setformdata({...formdata, username: e.target.value})}} name="username" id="username" placeholder='Username' className='p-3 border rounded-lg focus:placeholder:text-transparent'/>
        <input type="email" value={formdata.email} onChange={e=>{setformdata({...formdata, email: e.target.value})}} name="email" id="email" placeholder='Email' className='p-3 border rounded-lg focus:placeholder:text-transparent'/>
        <input type="password" value={formdata.password} onChange={e=>{setformdata({...formdata, password: e.target.value})}} name="password" id="password" placeholder='Password' className='p-3 border rounded-lg focus:placeholder:text-transparent'/>
        <button disabled={loading} type="submit" className="bg-slate-700 hover:bg-slate-500 text-white uppercase font-semibold p-4 rounded-lg disabled:opacity-80">
          { loading ? 'Loading ...' : 'SignUp' }
        </button>
      </form>
      <OAuth/>
      <div className="flex gap-2 mt-5">
        <p>Already have an account ?</p>
          <NavLink to={"/login"}>
            <span className='text-blue-700'>Login</span>
          </NavLink>
      </div>
      <div className="text-red-700 font-semibold text-2xl uppercase mt-5 flex justify-center p-5">
        { error }
      </div>
    </div>
  )
}
