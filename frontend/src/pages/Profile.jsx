import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const { currentUser } = useSelector( (state) => state.user);
  const fileref = useRef(null);
  const [file, setfile] = useState(undefined);
  const [fileperc, setfileperc] = useState(0);
  const [fileuploaderr, setfileuploaderr] = useState(false);
  const [formdata, setformdata] = useState({});
  
  useEffect(() => {
    if(file){
      handlefilestorage(file);
    }
  }, [file]);

  const handlefilestorage = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageref = ref(storage, filename);
    const uploadtask = uploadBytesResumable(storageref, file);

    uploadtask.on('state_changed', 
      (snapshot) => {
        const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
        setfileperc(Math.round(progress));
      },
      (err) => {
        setfileuploaderr(err);
      }, 
      () => {
        getDownloadURL(uploadtask.snapshot.ref)
        .then( (downloadURL) => {
          setformdata({...formdata, avatar: downloadURL});
        })
      }
    )
  };
  

  return (
    <div className='max-w-lg m-auto p-4'>
      <h1 className="text-3xl font-semibold text-center my-6">
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input onChange={e=>{setfile(e.target.files[0])}} type="file" ref={fileref} hidden accept='image/*' />
        <img 
          className='rounded-full h-24 w-24 self-center cursor-pointer mt-4 object-cover' 
          onClick={()=>{fileref.current.click()}}
          src={ formdata.avatar || currentUser.avatar } alt="profile" 
        />
        <p className='text-sm self-center'>
          {
            fileuploaderr
            ? ( <span>Error Image Upload (Image must be less than 4Mb)</span> )
            : fileperc > 0 && fileperc < 100 
              ? ( <span> {`Uploading ${fileperc}%`} </span> )
              : fileperc === 100
                ? ( <span>Successfully Uploaded !</span> )
                : " "
          }
        </p>
        <input className='border p-3 rounded-lg' type="text" placeholder='username' name="username" id="username" />
        <input className='border p-3 rounded-lg' type="text" placeholder='email' name="email" id="email" />
        <input className='border p-3 rounded-lg' type="text" placeholder='password' name="password" id="password" />
        <button className='rounded-lg p-3 uppercase text-white bg-slate-700 hover:opacity-80 disabled:opacity-50'>
            Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
        <span className="text-red-700 cursor-pointer font-semibold">Sign Out</span>
      </div>
    </div>
  )
}
