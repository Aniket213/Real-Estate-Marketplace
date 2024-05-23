import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userslice';
import OAuth from '../components/OAuth';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state)=>state.user);
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const loginhandler = e => {
    e.preventDefault();
    dispatch(signInStart());
    axios.post('http://localhost:8000/backend/auth/login', formdata)
    .then(res=>{
      dispatch(signInSuccess(res.data));
      navigate('/');
    })
    .catch(err=>{
      dispatch(signInFailure(err.message));
    })
  };

  return (
    <div className="max-w-lg m-auto mt-20">
      <h1 className='text-3xl text-center font-semibold my-7'>LogIn</h1>
      <form onSubmit={loginhandler} className="flex flex-col gap-4">
        <input type="email" value={formdata.email} onChange={e=>{setformdata({...formdata, email: e.target.value})}} name="email" id="email" placeholder='Email' className='p-3 border rounded-lg focus:placeholder:text-transparent'/>
        <input type="password" value={formdata.password} onChange={e=>{setformdata({...formdata, password: e.target.value})}} name="password" id="password" placeholder='Password' className='p-3 border rounded-lg focus:placeholder:text-transparent'/>
        <button disabled={loading} type="submit" className="bg-slate-700 hover:bg-slate-500 text-white uppercase font-semibold p-4 rounded-lg disabled:opacity-80">
          { loading ? 'Loading ...' : 'LogIn' }
        </button>
      </form>
      <OAuth/>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account ?</p>
          <NavLink to={"/signup"}>
            <span className='text-blue-700'>SignUp</span>
          </NavLink>
      </div>
      <div className="text-red-700 font-semibold text-2xl uppercase mt-5 flex justify-center p-5">
        { error }
      </div>
    </div>
  )
}
