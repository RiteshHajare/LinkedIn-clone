

function BasicConnectCard({user}) {
  // console.log(user);
  return (
    <div className="mt-2">
      <div className="flex gap-4">
        <img className="rounded-full h-12 w-12 " src={user.image} alt="myImg" />
        <div style={{ color: "rgba(0,0,0,0.9" }} className="flex flex-col">
          <h1 className="font-medium">
            {user.firstName !=null? user.firstName : user.username.split("@")[0]}  {user.firstName && user.lastName} <span className="roundeddot"> 1st</span>
          </h1>
          <p className="text-sm break-all">{user.headline &&(user.headline.length>52 ? (user.headline.substring(0,50).trim()+"..."):user.headline)}</p>
          {/* <button
            style={{ borderRadius: "1.5rem" }}
            className="outline outline-1.5 outline-basegrey text-basegrey box-border flex items-center justify-center w-28 gap-1 mt-2 font-medium  h-8 hover:outline-2 hover:bg-hovergrey"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                data-supported-dps="16x16"
                fill="currentColor"
                class="mercado-match"
                width="16"
                height="16"
                focusable="false"
              >
                <path d="M14 2L0 6.67l5 2.64 5.67-3.98L6.7 11l2.63 5L14 2z"></path>
              </svg>
            </div>
            Message
          </button> */}
          <button
            style={{ borderRadius: "1.5rem" }}
            className="outline outline-1.5 outline-basegrey text-basegrey box-border flex items-center justify-center w-28 gap-1 mt-2 font-medium  h-8 hover:outline-2 hover:bg-hovergrey"
          >
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
              <path d="M9 4a3 3 0 11-3-3 3 3 0 013 3zM6.75 8h-1.5A2.25 2.25 0 003 10.25V15h6v-4.75A2.25 2.25 0 006.75 8zM13 8V6h-1v2h-2v1h2v2h1V9h2V8z"></path>
            </svg>
            </div>
            Connect
          </button>
        </div>
      </div>
      <hr className="hrline mt-6" />
    </div>
  );
}

export default BasicConnectCard