import baseUrl from "@/helpers/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';

function LoggedNav({image}) {
  const router = useRouter();
  const cookies = new Cookies();
  const [self, setself] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [token, settoken] = useState('');
  const [toggle, setToggle] = useState(true)
    function handleToggle(){
      setToggle(!toggle)
    }
    useEffect(() => {
      const cookieValue =  cookies.get('token');
      settoken(cookieValue);
       axios.get(`${baseUrl}/api/feed`, { headers: {"Authorization" : `Bearer ${cookieValue}`} }).then((res)=>{
        setself(res.data.self);
        setShowProfile(true);
      }).catch((err)=>{
        console.log(err);
      })

    }, [])
    
    function closeCreate(e){
      if(!e.target.classList.value.includes("imgtoggle")){
          setToggle(true);
      }
    }

    const navigateHome = ()=>{
      router.push({
        pathname: '/feed'
      });
    }

    function navProfile() {
      router.push({
        pathname: '/profile',
        query: { token: token}
      });
    }

    
    
  return (
    <nav onClick={closeCreate}  className="removedrp fixed w-full left-0 top-0 z-50 card bg-white flex justify-between px-8 sm:px-16 py-1 align-center ">
        <div style={{display:"flex",alignItems:"center"}} className="div1 gap-2">
          <img id="Linkedimg" className="h-auto w-14 mt-2 sm:mt-0 mr-4 sm:mr-0  sm:w-8 sm:h-8" src="/linkedin.png" alt="" />
          <div className="hidden sm:block inputelement relative ">
          <input style={{width:"18rem"}} type="text" placeholder="Search" className="rounded bg-inputcolor pl-8 h-8 " />
          <div className="absolute top-2 left-2 opacity-40">
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
              <path d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z"></path>
            </svg>
          </div>
          </div>
        </div>
        <div className="ml-4 mt-4 sm:ml-0 sm:mt-0 div2 flex gap-8">
        <div className="home cursor-pointer opacity-60 hover:opacity-100">
        <div onClick={navigateHome} className="ml-auto mr-auto w-fit">
          <svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
            <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
          </svg>
        </div>
        <p className="text-xs hidden sm:block">Home</p>
        </div>
        <div className="network cursor-pointer opacity-60 hover:opacity-100">
        <div className="ml-auto mr-auto block w-fit">
          <svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
            <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
          </svg>
        </div>
        <p className="text-xs hidden sm:block">My Network</p>
        </div>
        <div className="jobs cursor-pointer opacity-60 hover:opacity-100">
        <div className="ml-auto mr-auto w-fit">
          <svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
            <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
          </svg>
        </div>
        <p className="text-xs hidden sm:block">Jobs</p>
        </div>
        <div className="message cursor-pointer opacity-60 hover:opacity-100">
        <div className="ml-auto mr-auto w-fit">
          <svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
            <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
          </svg>
        </div>
        <p className="text-xs hidden sm:block">Messaging</p>
        </div>
        <div className="notification cursor-pointer opacity-60 hover:opacity-100">
        <div className="ml-auto mr-auto w-fit">
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
            <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
          </svg>
        </div>
        <p className="text-xs hidden sm:block">Notifications</p>
        </div>
        <div  className="myimg cursor-pointer group relative ">
          {showProfile && <img onClick={handleToggle} id="errimg1" src={image ?image:(self.image?self.image:"/user.png")} className="imgtoggle rounded-full w-4 w-4 sm:w-7 sm:h-7 sm:rounded-full" alt="" />}
          <div onClick={handleToggle} className="flex ">
            <p className="imgtoggle text-xs hidden sm:block opacity-60 group-hover:opacity-100 ">Me</p><div className="inline-block opacity-60 group-hover:opacity-100">
            <svg className="imgtoggle"   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
            <path className="imgtoggle" d="M8 11L3 6h10z" fill-rule="evenodd"></path>
          </svg>
            </div>
          </div>
          <div hidden={toggle} className="dropdownsec">
            <div onClick={navProfile} className="dropdown flex ">
            <div className="basis-12 w-12 h-12">
            {showProfile && <img  className=" w-12 mt-1  h-12 rounded-full" src={image ?image:self.image} alt="myimg" />}

            </div>
              <div className="right basis-52">
                <h4 className="font-semibold">Ritesh Hajare</h4>
                <p className="text-sm">Student at JSPM's Rajarshi Shahu College of Engineering</p>
              </div>
            </div>
            <button onClick={navProfile} className="dropbtn hover:bg-hoverblue">View Profile</button>
            <hr className="hrline my-4" />
            <p className="logoutbtn pl-3 hover:underline">Sign out</p>
          </div>
        </div>
        <div  className="hidden sm:block spanor"></div>
        <div className="hidden sm:block tools cursor-pointer opacity-60 hover:opacity-100">
        <div className="ml-auto mr-auto w-fit ">
          <svg className="opacity-60 hover:opacity-100"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
            <path d="M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z"></path>
          </svg>
        </div>
       <div className="flex">
        <p className="text-xs hidden sm:block inline-block">Tools</p><svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
            <path d="M8 11L3 6h10z" fill-rule="evenodd"></path>
          </svg>
       </div>
        </div>
        <div className="hidden sm:block learning cursor-pointer opacity-60 hover:opacity-100">
        <svg className="ml-auto mr-auto"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24" focusable="false">
          <path d="M22 5v14H2V5h20m1-2H1a1 1 0 00-1 1v16a1 1 0 001 1h22a1 1 0 001-1V4a1 1 0 00-1-1z"></path>
          <path d="M2 5v14h10V5H2zm8 12H4v-2h6v2zm0-4H4v-2h6v2zm0-4H4V7h6v2z" style={{isolation:"isolate"}} opacity=".25"></path>
          <path style={{isolation:"isolate"}} opacity=".6" d="M14 7h6v2h-6zM14 11h6v2h-6zM14 15h6v2h-6z"></path>
          <path d="M10 7.53v8.93a.28.28 0 00.44.23l6.43-4.44a.33.33 0 00.06-.46l-.06-.06-6.43-4.43a.28.28 0 00-.44.23z"></path>
        </svg>
        <p className="text-xs hidden sm:block">Learning</p>
        </div>
        </div>
      </nav>
      
  )
}

export default LoggedNav

