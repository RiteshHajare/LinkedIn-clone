import { Inter } from '@next/font/google'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import HeadTag from '@/components/HeadTag'
import axios from "axios";
import Cookies from 'universal-cookie';
import baseUrl from "@/helpers/baseUrl";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const cookies = new Cookies();
  const router = useRouter();
  const [form, setForm] = useState({
    username:"",
    password:""
  })  
  const [toggle, setToggle] = useState("password");
  const [loginFailed, setLoginFailed] = useState(false);

  async function handleChange(e){
    const {name,value} = e.target;
     setForm((prev)=>{
      return{...prev,[name]:value}
     })
  }

  const handleClick = async ()=>{
    const res = await axios.post(`${baseUrl}/api/login`,form)
    if(res.data.success){
      cookies.set('token', res.data.token, { path: '/' })
      router.push('/feed');
    }else{
      setLoginFailed(true)
      setTimeout(()=>{
        setLoginFailed(false)
      },5000)
    }
  }


  return (
    <>
      <HeadTag title={"Linkedin"} />
      <Navbar check="home" />
      {loginFailed &&  <div className="absolute top-2 right-2"><div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">Error in Login. Please try again.</div>
    <button onClick={()=>{setLoginFailed(false)}} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    </div></div>}
      <main className='sm:flex my-12 mx-4 sm:mx-0'>
        <div className=' pl-2 sm:pl-14 flex flex-col gap-4'>
        <h1 className='rootheading text-4xl sm:text-6xl font-light'>Millions of job and people hiring</h1>
        <div className="relative  sm:w-width70  mt-8 customwidth group">
        <label className={`duration-200 cursor-text ease-in-out  absolute label left-3 group-focus-within:top-1 group-focus-within:text-xs ${form.username!==""?"top-1 text-xs":"top-2 "}`} htmlFor="email">Email or phone number</label>
        <input value={form.username} onChange={handleChange} placeholder='' className='w-full pl-3 h-12 pt-3 customrootinput' type="text" name="username" id="email" />
        </div>
        <div className="relative sm:w-width70 customwidth">
        <div className="group">
        <label className={`duration-200 cursor-text ease-in-out  absolute label left-3 group-focus-within:top-1 group-focus-within:text-xs ${form.password!==""?"top-1 text-xs":"top-2 "}`} htmlFor="Password">Password</label>
        <input value={form.password} onChange={handleChange} type={toggle} placeholder='' className='pl-3 w-full h-12 pt-3 customrootinput' name="password" id="Password" />
        </div>
        <button onClick={()=>{setToggle(toggle==='text'?'password':'text')}} className='absolute right-3 top-2 customround showbtn'>{toggle==="password"?"Show":"Hide"}</button>
        </div>
        <p><Link href="/">Forgot password?</Link></p>
        <button onClick={handleClick} className='signinbtn roundeffect sm:w-width70  w-width98 text-lg'>Sign in</button>
        <div className="line sm:w-width70"><span className='px-8'>or</span></div>
        <button className='signinbtn whitebtn roundeffect sm:w-width70  w-width98 text-lg'>
        <img className='w-5 inline-block mr-3 mb-1' src="/google.png" alt="googleImg" />
        Sign in with Google</button>
        <button onClick={()=>{router.push('signup')}} style={{color:"rgba(0, 0, 0, 0.75)",fontSize:"90%"}} className='signinbtn whitebtn roundeffect sm:w-width70  w-width98 text-lg'>New to LinkedIn? Join now</button>
        </div>
        <img className='w-1/2 relative rootimg mt-12' src="/rootimg.svg" alt="" />
      </main>
      
    </>
  )
}
