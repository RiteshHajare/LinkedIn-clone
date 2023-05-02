import baseUrl from "@/helpers/baseUrl";
import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react/cjs/react.development";

function ProfileIntro(props) {
  const handleRef = useRef();
  const [inputs, setinputs] = useState({
    firstname:props.introData.firstname,
    lastname:props.introData.lastname,
    headline:props.introData.headline,
    city:props.introData.city
  })

  function closeIntro() {
    props.setIntroToggle(false);
  }

  function closeCreate(e) {
    if (e.target.classList.value.includes("trial23")) {
      props.setIntroToggle(false);
    }
  }

  const handleChange = (e)=>{
    const{name,value}=e.target;
    setinputs(prev=>{
      return{
        ...prev,[name]:value
      }
    })
  }

  const handleClick = async()=>{
   
   const res = await axios.post(`${baseUrl}/api/intro`,inputs,{
    headers: {
      Authorization: 'Bearer ' + props.token
    }})

    if(res.data.success)closeIntro();
  }
  return (
    <div
      onMouseDown={closeCreate}
      ref={handleRef}
      style={{ backgroundColor: "rgba(0,0,0,.75)", zIndex: "10000" }}
      className="trial23 close fixed h-screen w-screen flex justify-center items-start  top-0 left-0"
    >
      <div
        style={{
          width: "35rem",
          height: "fit-content",
          borderRadius: "0.7rem",
        }}
        className="card bg-white mt-10"
      >
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-xl">Edit intro</span>
          <div onClick={closeIntro} className="cross p-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              class="mercado-match"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
            </svg>
          </div>
        </div>
        <hr className="hrline" />
        <div className="w-full py-4 px-5 flex flex-col gap-2 introinputs">
          <div>
            <label className="text-basegrey text-sm m-0 p-0" htmlFor="">
              First name*
            </label>
            <input onChange={handleChange} value={inputs.firstname} name="firstname" className="w-full m-0 p-0" type="text" />
          </div>
          <div>
            <label className="text-basegrey text-sm m-0 p-0" htmlFor="">
              Last name*
            </label>
            <input onChange={handleChange} value={inputs.lastname} name="lastname" className="w-full m-0 p-0" type="text" />
          </div>
          <div>
            <label className="text-basegrey text-sm m-0 p-0" htmlFor="">
              Headline*
            </label>
            <input onChange={handleChange} value={inputs.headline} name="headline" className="w-full m-0 p-0" type="text" />
          </div>
          <div>
            <label className="text-basegrey text-sm m-0 p-0" htmlFor="">
              City
            </label>
            <input onChange={handleChange} value={inputs.city} name="city" className="w-full m-0 p-0" type="text" />
          </div>
        </div>
        <div onClick={handleClick} className="flex mt-3 items-center justify-end px-5 mb-4">
          <div className="postbtn inline-block w-fit">Save</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileIntro;
