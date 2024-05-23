import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userslice';

export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handlegoogleclick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            // console.log(result);
            
            const { displayName, email, photoURL } = result.user;
            const user = {
                name: displayName,
                email: email,
                photo: photoURL,
            };
            try {
                const response = await axios.post(
                  "http://localhost:8000/backend/auth/google",
                  user
                );
                // console.log("Backend response:", response.data);
                dispatch(signInSuccess(response.data));
                navigate('/');
              } catch (error) {
                console.error("Error sending data to backend:", error);
              }
        }
        catch (error) {
            console.log("Could not connect with google", error);
        }
    }

  return (
    <div>
        <button type='submit' onClick={handlegoogleclick}
            className='bg-red-700 text-white p-4 rounded-lg uppercase hover:opacity-80 font-semibold w-full mt-4'>
            Continue with Google
        </button>
    </div>
  )
}
