import Navbar from "@/components/Navbar"
import baseUrl from "@/helpers/baseUrl";
import axios from "axios";
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'universal-cookie';
import HeadTag from "@/components/headTag";

function signin() {
  const cookies = new Cookies();
  const router = useRouter();
  const inputTxt = useRef(null);
  const [toggle, setToggle] = useState("password");
  const [loginFailed, setLoginFailed] = useState(false);
  const [form, setForm] = useState({
    username:"",
    password:""
  })  

  async function handleChange(e){
    const {name,value} = e.target;
     setForm((prev)=>{
      return{...prev,[name]:value}
     })
  }

  useEffect(() => {
    inputTxt.current.focus()
  }, [])

  async function handleClick(){
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
      <HeadTag title={"LinkedIn Login, Sign in | LinkedIn"} />
      <div className=" min-h-screen ">
      <Navbar />
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
      <div className="flex flex-col h-3/5 mt-5 items-center gap-8 ">
        <div className="card lg:shadow-signinCard bg-white flex flex-col items-left gap-xl w-full lg:w-width28  p-6 mb-8">
        <h1 className="text-3xl font-medium mb-2">Sign in</h1>
        <small className="text-small">Stay updated on your professional world</small>
           <div className="relative  sm:w-full  mt-8 customwidth group my-2">
              <label className={`duration-200 cursor-text ease-in-out  absolute label left-3 group-focus-within:top-1 group-focus-within:text-xs ${form.username!==""?"top-1 text-xs":"top-3 "}`} htmlFor="email">Email or Phone</label>
              <input ref={inputTxt} autofocus="autofocus" value={form.username} onChange={handleChange} placeholder='' className='w-full pl-3 h-12 pt-3 customrootinput' type="text" name="username" id="email" />
            </div>
            <div className="relative sm:w-full customwidth my-2">
              <div className="group">
                <label className={`duration-200 cursor-text ease-in-out  absolute label left-3 group-focus-within:top-1 group-focus-within:text-xs  ${form.password!==""?"top-1 text-xs":"top-3 "}`} htmlFor="Password">Password</label>
                <input  value={form.password} onChange={handleChange} type={toggle} placeholder='' className='pl-3 w-full h-12 pt-3 customrootinput ' name="password" id="Password" />
              </div>
              <button onClick={()=>{setToggle(toggle==='text'?'password':'text')}} className='absolute right-3 top-2 customround showbtn'>{toggle==="password"?"Show":"Hide"}</button>
            </div>
            <p className="text-linkedincolor2 font-medium"><Link href="/">Forgot password?</Link></p>
            <button style={{padding:"0.5rem"}} onClick={handleClick}  className='  signinbtn roundeffect sm:w-full  w-full text-lg active:bg-black my-4 mb-0'>Sign in</button>
            <div style={{padding:"0.625rem"}} className="line sm:w-full  py-5"><span className='px-8 '>or</span></div>
            <button style={{padding:"0.3rem",fontSize:"0.9rem"}} className='my-2 signinbtn whitebtn roundeffect sm:w-width95  w-full text-lg mx-auto'>
              <img  className='w-5 inline-block mr-3 relative bottom-0.5' src="/google.png" alt="googleImg" />
              Sign in with Google
            </button>
            <button style={{padding:"0.3rem",fontSize:"0.9rem"}} className='my-2 signinbtn whitebtn roundeffect sm:w-width95  w-full text-lg mx-auto'>
            <i className="fa-brands fa-apple text-black w-5 mr-3 relative top-0.5 text-2xl"></i>              
            Sign in with Apple
            </button>
        </div>
      </div>
      <h4 className="text-center mb-8">New to LinkedIn? <Link className="text-linkedincolor2 font-medium hover:underline hover:text-purple-500" href="/signup">Join now</Link> </h4>
    </div>
    </>
  )
}

export default signin