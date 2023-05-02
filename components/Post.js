import { useEffect, useState } from "react"


function Post({post}) {
  const [liked, setLiked] = useState(false);
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [userPost, setUserPost] = useState();

  function handleLike(){
    setLiked(!liked)
  }
  useEffect(() => {
    if(post.userID.lastname) setSurName(post.userID.lastname );
    if(post.userID.firstName) setName(post.userID.firstName );
    else{
      var array = post.userID.username.split("@"); 
      setName(array[0]);
    }

    setUserPost(handleBody());
    
  }, [])

  function handleBody(){

    let body = post.body;
    let keywords = body.match(/#[^\s]+/g); // extract all hashtags

    if (keywords) {
    // wrap each keyword in a span with a class or style
    keywords.forEach(keyword => {
      body = body.replace(keyword, `<span class="hashtag">${keyword}</span>`);
    });
    
    }
     return {__html: body};
  }
  

  return (
    <div className="bg-white post mb-2">
        <div className="pt-3 px-4 mb-2">
            <div className="flex gap-2">
                <img className="w-12 h-12 rounded-full" src={post.userID.image?post.userID.image:"/user.png"} alt="userIMG" />
                <div className="postprofileright">
                    <h3 className="font-semibold text-black text-sm">{name} {surName}</h3>
                    <p className="text-xs">{post.userID.headline && (post.userID.headline.length>69?(post.userID.headline.substring(0,70).trim()+"...") : post.userID.headline)}</p>
                    <p className="text-xs">{post.time && post.time}</p>
                </div>
            </div>
            <p dangerouslySetInnerHTML={userPost} id="parabody" style={{whiteSpace: "break-spaces",wordWrap: "break-word",width:"100%",fontSize:"0.9rem",display:"inline-block"}}>
                
                </p>
        </div>
        {post.type=="image"?<img style={{objectPosition: "center",objectFit: 'cover'}} className="mb-6" src={post.media} alt="" />:
        <video controls src={post.media}></video> }
        <hr style={{width:"94%",display:"block",margin:"0 auto",color:"#999797",marginBottom:"0"}} className="hrline" />
        <div className="postbase flex gap-2 w-1/10 sm:w-11/12 ml-auto mr-auto ">
          <p onClick={handleLike} className="cursor-pointer flex justify-center items-center">{!liked?<i className="text-2xl fa-regular fa-thumbs-up"></i>:<i class="text-sky-500 text-2xl fa-sharp fa-solid fa-thumbs-up"></i>} Like</p>
          <p className="cursor-pointer flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
            <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z"></path>
          </svg> Comment</p>
          <p className="cursor-pointer flex justify-center items-center"><i className="text-2xl fa-solid fa-retweet"></i> Repost</p>
          <p className="cursor-pointer flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
            <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"></path>
          </svg> Send</p>
        </div>
    </div>
  )
}

export default Post

{/* <i class="fa-duotone fa-thumbs-up"></i> */}