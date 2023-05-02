import BasicConnectCard from "@/components/BasicConnectCard"
import HeadTag from "@/components/HeadTag"
import LoggedNav from "@/components/LoggedNav"
import ProfileIntro from "@/components/ProfileIntro"
import { useState ,useEffect} from "react"
import { useRouter } from 'next/router';
import axios from "axios"
import baseUrl from "@/helpers/baseUrl"


function profile() {
    const [introToggle, setIntroToggle] = useState(false)
    const router = useRouter();
    const { token } = router.query; 
    const [introData, setIntroData] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [images, setImages] = useState({
        myimg:"",
        bgimg:""
    })
    const [showImg, setshowImg] = useState(false);

   useEffect(() => {

    users();
   }, [])

   async function users(){
    const self = await axios.get(`${baseUrl}/api/intro`,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      setImages({myimg:self.data.image,bgimg:self.data.bgimg});
      setshowImg(true)
    const users = await axios.get(`${baseUrl}/api/profile`,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

    //   console.log(users.data);
      setAllUsers(users.data);
 
   }
   
    useEffect(() => {
        getData();
    }, [introToggle])

    async function getData(){
        const res = await axios.get(`${baseUrl}/api/intro`,{
            headers: {
              Authorization: 'Bearer ' + token
            }})
            
        setIntroData(res.data);
    }

    async function postImg(e){
        
        try {
            const form = new FormData();
            form.append('file', e.target.files[0]);
            form.append('upload_preset', 'linkedinMedia');
            form.append('cloud_name', 'dgz1wimeg');
            const url = await axios.post("https://api.cloudinary.com/v1_1/dgz1wimeg/upload", form)
            const res = await axios.post(`${baseUrl}/api/profile`,{link:url.data.url,type:e.target.name},{
                headers: {
                  Authorization: 'Bearer ' + token
                }
              })
            if(res.data.success){
                setImages(prev=>{
                    return{...prev,[e.target.name]:url.data.url}
                })
            }
        } catch (error) {
            console.log(error);
            alert("Error occured while saving image");
        }
    }
  return (
    <div className="profilepage min-h-screen">
        <HeadTag title={"Ritesh Hajare | LinkedIn"}  />
        <LoggedNav image={images.myimg} />
        {introToggle && <ProfileIntro introData={introData} setIntroToggle={setIntroToggle} token={token}  />}
        <div className="profileMain flex gap-6 flex-col sm:flex-row w-full ">
            <div style={{flexBasis:"50 rem"}} className="profileleft post  bg-white pb-4 whitespace-pre-wrap">
                <div className="profileimgs w-full relative cursor-pointer">
                    {showImg && <img style={{borderRadius:"8px",height:"12.5rem",width:"50rem"}} className="profileimg1 h-12" src={images.bgimg?images.bgimg:"/defaultBGIMG.jpeg"} alt="bgImg" />}
                    <div className="absolute left-8 top-24">
                        <div className="relative profileimgdiv">
                        {showImg && <img style={{outline:"4px solid white"}} className="profileimg2 w-28 h-28 sm:w-36 sm:h-36  rounded-full " src={images.myimg?images.myimg:"/user.png"} alt="userimg" />}
                        <input name="myimg" onChange={postImg} className="object-cover rounded-full top-0 w-36 absolute w-full h-full " type="file"  id="" />
                        </div>
                    </div>
                    <div className="bg-white flex items-center justify-center rounded-full w-8 h-8 inline-block absolute top-6 right-5 text-linkedincolor2 hover:text-black">
                        <div style={{cursor:"pointer"}} className="flex items-center justify-center rounded-full w-8 h-8 relative">
                            <svg className="relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
                                <path d="M14.13 1.86a3 3 0 00-4.17 0l-7 7L1 15l6.19-2 6.94-7a3 3 0 000-4.16zm-8.36 9.71l-1.35-1.34L9.64 5 11 6.35z"></path>
                            </svg>
                            <input name="bgimg" onChange={postImg} className="rounded-full  w-8 h-8 absolute w-full h-full opacity-0 cursor-pointer" type="file"  id="" />
                        </div>
                    </div>
                    <div onClick={()=>{setIntroToggle(!introToggle)}} className="absolute pensilsvg right-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                            <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                        </svg>
                    </div>
                </div>
                <div style={{width:"50rem"}} className=" mt-16 px-6">
                    <h1 className="font-heavy font-medium text-2xl">{introData.firstname} {introData.lastname}</h1>
                    <p className="break-all">{introData.headline}</p>
                    <p className="text-basegrey text-sm mt-1">{introData.city}</p>
                    <p className="text-linkedincolor2 text-sm font-medium mt-1">291 connections</p>
                </div>
                <button style={{borderRadius:"1.5rem"}} className='bg-linkedincolor2 w-24  py-1 text-white font-semibold mt-2 ml-5  text-md'>Open to</button>
            </div>
            <div style={{flexBasis:"18.7 rem"}} className="ml-auto mr-auto mb-4 sm:mb-0 sm:m-0 allbasicconnect w-width95 sm:w-18.7 post profileright px-6 py-4 bg-white ">
                    <h1 className="mb-3 font-medium">People also viewed</h1>
                    {allUsers.map((user,index)=>{
                        return <BasicConnectCard user={user} />
                    })}
            </div>
        </div>
    </div>
  )
}

export default profile

// export async function getStaticProps(context) {
//     const res = await fetch(`${baseUrl}/api/profile`);
//     const data = await res.json();
//     console.log(data);
//     return {
//       props: {data}, // will be passed to the page component as props
//     }
//   }

