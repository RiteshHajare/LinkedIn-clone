

function RightGrid(props) {
  return (
    <div className="grid-item griditem3 hidden sm:block">
             {props.news && <div  className="grid3 flex flex-col  bg-white ">
             <h1 className="font-medium pl-3 my-2">LinkedIn News</h1>
                <div>
                  <h4><span></span> Making flexible work for women</h4>
                  <small>3d ago . 1,474 readers</small>
                </div>
                <div>
                  <h4><span></span> Meta to layoff another 10k workers</h4>
                  <small>22h ago . 1,276 readers</small>
                </div>
                <div>
                  <h4><span></span> Mock interviews are on the rise</h4>
                  <small>11h ago . 147 readers</small>
                </div>
                <div>
                  <h4><span></span>Lenskart bucks funding trend</h4>
                  <small>1d ago .43,756 readers</small>
                </div>
                <div>
                  <h4><span></span> Startups brace for the SVB impact</h4>
                  <small>6d ago . 11,864 readers</small>
                </div>
             </div>}
             <div className={`rightbottom ${props.news==false ? "fixed":"relative"} flex flex-col gap-2 mt-6 justify-center`}>
                <div className="flex gap-3">
                  <span>About</span>
                  <span>Accessibility</span>
                  <span>Help Center</span>
                </div>
                <div className="flex gap-3">
                  <span>Privacy & Terms </span>
                  <span>Ad Choices</span>
                </div>
                <div className="flex gap-3">
                  <span>Advertising</span>
                  <span>Business Services </span>
                </div>
                <div className="flex gap-3">
                  <span>Get the LinkedIn app</span>
                  <span>More </span>
                </div>
                <div className="copyright flex gap-1">
                  <span className='text-black copyright1 titlecolor font-bold '>Linked</span> 
                  <img className='sm:w-4 h-4 inline-block logoimg' src="/linkedin.png" alt="" />
                  <span style={{color:"black",textDecoration:"none",cursor:"text"}}>LinkedIn Corporation © 2023</span>
                </div>
             </div>
          </div>
  )
}

export default RightGrid