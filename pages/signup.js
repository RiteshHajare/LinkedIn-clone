import HeadTag from "@/components/HeadTag";
import Navbar from "@/components/Navbar"
import baseUrl from "@/helpers/baseUrl";
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from 'universal-cookie';

function signup() {
  const cookies = new Cookies();
  const router = useRouter();
  const [toggle, setToggle] = useState("password");
  const [loginFailed, setLoginFailed] = useState({err:false,message:''});
  const [form, setForm] = useState({
    username:"",
    password:""
  })  
  const [err, setErr] = useState({
    username:"",
    password:""
  })  

  async function handleChange(e){
    const {name,value} = e.target;
     setForm((prev)=>{
      return{...prev,[name]:value}
     })

    setErr((prev)=>{
      return{...prev,[name]:""}
    })
  }

  const handleBlur = async (e)=>{
    const {name} = e.target;
    if(form.username==="" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.username)){
      if(name==="username"){
        setErr((prev)=>{
          return{...prev,[name]:"Please enter a valid email address or mobile number."}
        })
      }
    }

    if(form.password===""){
      if(name==="password"){
        setErr((prev)=>{
          return{...prev,[name]:"Please enter your password."}
        })
      }
      return;
    }

    if(form.password.length<6){
      if(name==="password"){
        setErr((prev)=>{
          return{...prev,[name]:"Password must be 6 characters or more."}
        })
      }
      return;
    }
  }

  const handleClick = async ()=>{
    if(form.username==="" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.username)){
      setErr(prev=>{return{...prev,username:"Please enter a valid email address or mobile number."}});

    }

    if(form.password===""){
      setErr(prev=>{return{...prev,password:"Please enter your password."}})
      return;
    }

    if(form.password.length<6){
      setErr(prev=>{return{...prev,password:"Password must be 6 characters or more."}});
      return;
    }
    if(err.username==="" && err.password==="" && form.username!=="" && form.password!==""){
      
      const res =  await axios.post(`${baseUrl}/api/signup`,form);
      if(res.status===201){
        console.log(res.data);
        cookies.set('token', res.data.token, { path: '/' })
        router.push('/feed');
      }else if(res.data.error){
        console.log(res.data.error);
        setLoginFailed({err:true,message:res.data.error});
        setTimeout(()=>{
          setLoginFailed(false)
        },5000)
      }else{ 
        console.log(res.data);
        setLoginFailed({err:true,message:"Error in Signup. Please try again."})
        setTimeout(()=>{
          setLoginFailed(false)
        },5000)
      }
    }

  }

  return (
    <>
      <HeadTag title={"Sign Up | LinkedIn"} />
      <div className="lg:bg-signuppagecolor min-h-screen ">
      <Navbar />
      {loginFailed.err &&  <div className="absolute top-2 right-2"><div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">{loginFailed.message}</div>
    <button onClick={()=>{setLoginFailed(false)}} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    </div></div>}
      <div className="flex flex-col h-3/5 mt-8 items-center gap-8 ">
      <h1 className="md:hidden text-center text-2xl font-medium">Join LinkedIn now — it's free!</h1>
        <h1 className="text-3xl ml-6 hidden lg:ml-0 lg:block">Make the most of your professional life</h1>
        <div className="card bg-white flex flex-col items-left gap-xl w-full lg:w-1/3  p-6 mb-8">
            <div className="w-full">
            <label className="text-placeholder" htmlFor="username">Email or phone number</label>
            <input title="Please fill in this field."
             type="text"
              id="username"
              name="username"
              className={`block signupInput pl-2 my-2 focus:border-2 border-1`}
              style={{borderColor:err.username!==""&&"#d11124",outline:err.username!==""&&"#d11124"}}
              onChange={handleChange}
              value={form.username}
              onBlur={handleBlur}
               />
            </div>
            <p className="text-errColor mb-3">{err.username!=="" && err.username}</p>
            <div className="w-full relative">
            <label className="text-placeholder" htmlFor="password">Password (6 or more characters)</label>
            <input
             title="Please fill in this field."
              type={toggle}
              name="password"
              id="password" 
              className="block signupInput pl-2 my-2 focus:border-2 border-1"
              style={{borderColor:err.password!==""&&"#d11124",outline:err.password!==""&&"#d11124"}}
              onChange={handleChange}
              value={form.password}
              onBlur={handleBlur}
              />
              <button onClick={()=>{setToggle(toggle==='text'?'password':'text')}} 
              className="absolute top-1/2 right-2 hover:underline text-placeholder"
              >{toggle==="password"?"Show":"Hide"}
              </button>
            </div>
            <p className="text-errColor">{err.password!=="" && err.password}</p>
            <small className="text-center hidden lg:block my-4">By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</small>
            <button onClick={handleClick} style={{padding:"0.5rem"}}  className='mt-4 lg:mt-0 signinbtn roundeffect sm:w-full  w-full text-lg active:bg-black'>Agree & join</button>
            <div className="line sm:w-full  py-5"><span className='px-8 '>or</span></div>
            <button style={{padding:"0.3rem",fontSize:"0.9rem"}} className='signinbtn whitebtn roundeffect sm:w-width95  w-full text-lg mx-auto'>
              <img  className='w-5 inline-block mr-3 relative bottom-0.5' src="/google.png" alt="googleImg" />
              Continue with Google
            </button>
            <h4 className="mx-auto mt-4 ">Already on LinkedIn? <Link className="text-linkedincolor2 font-medium hover:underline hover:text-purple-500" href="/signin">Sign in</Link> </h4>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default signup