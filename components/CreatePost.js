import baseUrl from "@/helpers/baseUrl";
import axios from "axios";
import { useRef, useState } from "react";

function CreatePost(props) {
    const [img, setImg] = useState();
    const [body, setBody] = useState('');
    const [saveFailed, setSaveFailed] = useState(false)
    const [mediaPreview, setMediaPreview] = useState({url:"",type:"image"}) 
    const handleRef = useRef()

    function closeCreatePost(){
        props.setCreatePost(false);
    }

    function closeCreate(e){
        if(e.target.classList.value.includes("trial23")){
            props.setCreatePost(false);
        }
      }

    function handlePreview(e){
        setMediaPreview({})
        const reader = new FileReader();
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        setImg( e.target.files[0])
        if (selectedFile) {
        reader.readAsDataURL(selectedFile);
        }

        reader.onload = (readerEvent) => {
        if (selectedFile.type.includes("image")) {
            setMediaPreview({url:readerEvent.target.result,type:"image"});
        } else if (selectedFile.type.includes("video")) {
            setMediaPreview({url:readerEvent.target.result,type:"video"});
        }
        };
    }

    async function mediaPost(){
        if(body==""){
            setSaveFailed(true);
            setTimeout(()=>{
                setSaveFailed(false)
              },5000)
              return;
        }
        try {
            const form = new FormData();
            form.append('file', img);
            form.append('upload_preset', 'linkedinMedia');
            form.append('cloud_name', 'dgz1wimeg');
            const url = await axios.post("https://api.cloudinary.com/v1_1/dgz1wimeg/upload", form)
            const formattedDate = new Date().toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
            }).replace(/ /g, '-');
            console.log(formattedDate);
            const res = await axios.post(`${baseUrl}/api/createpost`,{body,type:mediaPreview.type,link:url.data.url,date:formattedDate},{
                headers: {
                  Authorization: 'Bearer ' + props.token
                }
              })
            if(res.data.success){
                props.setpostedMessage(true);
                props.setCreatePost(false)
            }else{
                setSaveFailed(true);
                setTimeout(()=>{
                setSaveFailed(false)
              },5000)
            }
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div onClick={closeCreate} ref={handleRef} style={{overflowY:"auto",backgroundColor:"rgba(0,0,0,.75)",zIndex:"10000"}} className="trial23 close fixed h-screen w-screen flex justify-center items-start  top-0 left-0">
    {saveFailed && <div className="z-50 mr-4 fixed top-2 right-2"><div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">{props.err}</span>
    </div>
    <div class="ml-3 text-sm font-normal">Please fill required data</div>
    <button onClick={()=>{setSaveFailed(false)}} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    </div>
    </div>}
    
        <div  style={{width:"35rem",height:"fit-content",borderRadius:"0.7rem"}} className="card bg-white mt-10">
            <div className="flex justify-between items-center px-4 py-2">
                <span className="text-xl">Create a post</span>
                <div onClick={closeCreatePost} className="cross p-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                    <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
                </svg>
                </div>
            </div>
            <hr className="hrline" />
            <div className="w-full py-4 px-5 flex gap-2">
                <img className="w-12 rounded-full" src={props.image?props.image:"/user.png"} alt="" />
                <div>
                    <h1 className="font-medium">Ritesh Hajare</h1>
                    <button className="anyonebtn flex items-center gap-1 px-2 mt-1 font-medium">
                    <div className="inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
                            <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
                        </svg>
                    </div>
                    Anyone 
                    <div className="inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
                            <path d="M8 11L3 6h10z" fill-rule="evenodd"></path>
                        </svg>
                    </div>
                    </button>
                </div>
            </div>
            <textarea onChange={(e)=>{setBody(e.target.value)}} value={body} autoFocus  placeholder="What do you want to talk about?" className="mt-2" name="" id="" cols="30" rows="10"></textarea>
            {mediaPreview.type=='image'?<img style={{objectFit: "contain"}} className="w-full" src={mediaPreview.type==="image" && mediaPreview.url} alt="" /> 
            :<video controls src={mediaPreview.type==="video" && mediaPreview.url}></video>}
            <div className="flex mt-3 items-center gap-4 justify-between px-5 mb-4">
                <div className="imgvideo flex gap-4">
                    <div  className="relative inline-block w-fit cursor-pointer">
                        <svg className="z-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                            <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                        </svg>
                        <input accept="image/*"  onChange={handlePreview} className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0 z-50" type="file" name="" id="" />
                    </div>
                    <div className="relative inline-block w-fit cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                            <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
                        </svg>
                        <input accept="video/*" onChange={handlePreview}  className="absolute top-0 left-0 w-full h-full opacity-0  z-50" type="file" name="" id="" />
                    </div>
                </div>
                <div onClick={mediaPost} className='postbtn inline-block w-fit'>Post</div>
            </div>
        </div>
    </div>
  )
}

export default CreatePost

