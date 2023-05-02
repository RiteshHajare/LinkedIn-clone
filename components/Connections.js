import { useState } from "react";

function Connections() {
    const [connToggle, setConnToggle] = useState(true)

    function removeConn(){
        setConnToggle(!connToggle)
    }

  return (
    <div>
      <div className="flex gap-4 mx-0 sm:mx-4 items-center relative w-full">
        <img
          style={{ width: "4.5rem", height: "4.5rem" }}
          className="rounded-full sm:ml-0 ml-1"
          src="/user.png"
          alt=""
        />
        <div style={{ color: "rgba(0,0,0,0.9" }} className="flex flex-col mb-4">
          <h1 className="font-medium">Viraj Govilkar</h1>
          <p style={{overflow:"wrap"}} className="text-sm imgvideo">
            Android App Development | Flutter | Java
          </p>
        </div>
        <div className="flex gap-3 absolute right-8 top-14 sm:top-2 items-center">
          <button
            style={{ borderRadius: "1.5rem" }}
            className="connectmsg my-auto inline-block outline outline-1.5 outline-linkedincolor2 text-linkedincolor2 box-border flex items-center justify-center w-24  gap-1 font-medium  h-8 hover:outline-2"
          >
            Message
          </button>
          <div onClick={removeConn} className="relative rounded-full p-1 text-basegrey  hover:bg-hovergrey cursor-pointer">
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
              <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"></path>
            </svg>
            <div hidden={connToggle} style={{boxShadow:" rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}} className="z-50 bg-white w-max rounded-lg absolute right-0 top-9 post  px-2 py-3 hover:bg-hovergrey">
                <i className="fa-solid fa-trash mr-4"></i>
                <span>Remove Connection</span>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ width: "88%", float: "right" }} className="hrline my-3 " />
    </div>
  );
}

export default Connections;
