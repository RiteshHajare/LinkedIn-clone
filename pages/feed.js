import CreatePost from "@/components/CreatePost";
import HeadTag from "@/components/HeadTag";
import LoggedNav from "@/components/LoggedNav";
import PeopleSvg from "@/components/PeopleSvg";
import Post from "@/components/Post";
import RightGrid from "@/components/RightGrid";
import baseUrl from "@/helpers/baseUrl";
import axios from "axios";
import {useEffect, useState } from "react";
import { useRouter } from "next/router";

function Feed({token,data}) {
  const [posted, setposted] = useState(false)
  const [postedMessage, setpostedMessage] = useState(false)
  const [createPost, setCreatePost] = useState(false);
  const [posts, setPosts] = useState();
  const router = useRouter();
  
  function postInput(){
    setCreatePost(true);
  }

  useEffect(() => {
    getData();
     async function getData(){
      console.log(data.posts);
      setPosts(data.posts);
    }
  }, [])
  
  function navProfile() {
      router.push({
        pathname: '/profile',
        query: { token: token}
      });
    }

  useEffect(() => {
    if(postedMessage){
      setposted(true)
      setTimeout(()=>{
          setposted(false)
          setpostedMessage(false)
        },5000)
    }
  }, [postedMessage])


  return (
    <section  className="feed relative">
      {createPost && <CreatePost  token={token} setCreatePost={setCreatePost} setpostedMessage={setpostedMessage} image={data.self.image}  />}
      {posted &&<div className="z-50 mr-4 absolute top-2 right-2"> <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">Posted successfully.</div>
    <button onClick={()=>{setposted(false)}} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    </div></div>}
      <HeadTag title={"Feed | LinkedIn"} />
      <LoggedNav  />
      <div  class="grid-container">
        <div class="grid-item">
          <div className="lefttop bg-white">
            <div id="profileimgdiv" className="relative">
            <p className="absolute top-1 z-50 left-2 text-white text-xs tracking-widest">PREMIUM</p>
            <div className="mytri"><img className="bgimg cursor-pointer" src={data.self.bgimg?data.self.bgimg:"/defaultBGIMG.jpeg"} style={{width:"14.917rem",height:"3.729rem"}} alt="" /></div>
            <img onClick={navProfile} id="profileimg" style={{bottom:"-50%",right:"38%",border: "3px solid white",width:"4rem",height:"4rem" }} className="cursor-pointer rounded-full w-16 absolute z-50" src={data.self.image?data.self.image:"/user.png"} alt="" />
            </div>
            <h1 onClick={navProfile} className="text-center mt-11 font-medium mb-0 pb-0 cursor-pointer hover:underline">{data.self.firstName?data.self.firstName:data.self.username.split("@")[0]} {data.self.firstName && data.self.lastName}</h1>
            <p className=" college break-all">{data.self.headline && (data.self.headline.length>68 ? (data.self.headline.substring(0,65).trim()+"..."):data.self.headline)}</p>
            <hr className="hrline" />
            <small className="cursor-pointer py-1  leftdetail mt-4 pl-3 font-medium  relative">Who&apos;s viewed your profile <span className="text-linkedincolor2  absolute right-4">23</span></small>
            <small className="cursor-pointer py-1 leftdetail mb-4 pl-3 font-medium relative">Impressions of your posts <span className="text-linkedincolor2  absolute right-4">2333</span></small>
            <hr className="hrline" />
            <small className="block text-left pl-4 py-3 feature font-medium">
            See your Premium features
            </small>
            <hr className="hrline" />
            <small className="block text-left pl-4 py-3 feature font-medium">My items</small>
          </div>
          <div className="bottomleft bg-white font-medium pl-3">
            <h5 className="text-xs my-3">Recent</h5>
            <p className="flex gap-2  mb-1"><PeopleSvg />Java Learning Group - Linkedin </p>
            <p className="flex gap-2  mb-1"><PeopleSvg />Fuel fellows and alumni students </p>
            <p className="flex gap-2  mb-1"><PeopleSvg />The Sparks foundation network </p>
            <p className="flex gap-2  mb-1"><PeopleSvg />Java Developer&apos;s Community </p>
            <p className="flex gap-2 mb-1"><PeopleSvg />LET&apos;s Grow More community </p>
            <h5 className="text-linkedincolor2 text-xs my-3">Groups</h5>
            <p className="flex gap-2  mb-1"><PeopleSvg />The Sparks foundation network </p>
            <p className="flex gap-2  mb-1"><PeopleSvg />Java Developer&apos;s Community </p>
            <p className="flex gap-2  mb-1"><PeopleSvg />LET&apos;s Grow More community </p>
          </div>
        </div>
        <div className="grid-item relative postsdiv mt-3 sm:mt-0">
          <div className="middletop flex flex-col p-3 pb-1 bg-white gap-1 mb-2">
              <div className="flex gap-2">
                <img onClick={navProfile} className="basis-12 w-12 h-12 rounded-full cursor-pointer" src={data.self.image?data.self.image:"/user.png"} alt="" />
                <div onClick={postInput} className="w-full basis-11/12">
                  <input  className="postinput h-full" placeholder="Start a post" disabled />
                </div>
              </div>
              <div className="additionalOptions flex gap-1 sm:gap-7">
                <div className="flex gap-1 hover:cursor-pointer text-sm justify-center items-center">
                <svg style={{color:'#378fe9'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                  <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                </svg>Photo
                </div>
                <div className="flex gap-1 hover:cursor-pointer text-sm justify-center items-center">
                <svg style={{color:'#5f9b41'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                  <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
                </svg>Video
                </div>
                <div className="flex gap-1 hover:cursor-pointer text-sm justify-center items-center">
                <svg style={{color:'#c37d16'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                  <path d="M3 3v15a3 3 0 003 3h12a3 3 0 003-3V3zm13 1.75A1.25 1.25 0 1114.75 6 1.25 1.25 0 0116 4.75zm-8 0A1.25 1.25 0 116.75 6 1.25 1.25 0 018 4.75zM19 18a1 1 0 01-1 1H6a1 1 0 01-1-1V9h14zm-5.9-3a1 1 0 00-1-1H12a3.12 3.12 0 00-1 .2l-1-.2v-3h3.9v1H11v1.15a3.7 3.7 0 011.05-.15 1.89 1.89 0 012 1.78V15a1.92 1.92 0 01-1.84 2H12a1.88 1.88 0 01-2-1.75 1 1 0 010-.25h1a.89.89 0 001 1h.1a.94.94 0 001-.88z"></path>
                </svg>Audio event
                </div>
                <div className="flex gap-1 hover:cursor-pointer text-sm justify-center items-center">
                <svg style={{color:'#e16745'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                  <path d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z"></path>
                </svg>Write article
                </div>
              </div>
          </div>
          {posts && posts.map((post,index)=>{
            return <Post key={index} post={post} />
          })}
            {/* <i className="fa-solid text-3xl fa-arrow-down absolute bottom-0 left-1/2"></i> */}
          </div>
          <RightGrid news={true} />
        </div>

    </section>
    
  )
}

export default Feed

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`); 
  const res = await fetch(`${baseUrl}/api/feed`,{headers});
  const data = await res.json();
  // console.log(data);
    if(!context.req.cookies.token){
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props:{},
      };
    }
    return {
      props:{token:context.req.cookies.token,data}
      }
}


// rgba(0,0,0,0.6)