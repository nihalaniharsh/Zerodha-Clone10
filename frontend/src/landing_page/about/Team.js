import React from 'react';


function Team() {
    return ( 
        <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">
         People</h1>
      </div>
       <div className="row p-3  text-muted" style={{ lineHeight: "1.8", fontSize: "1em"}}>
        <div className="col-6 p-5 text-center">
           <img src='media/images/harsh.jpg' style={{borderRadius: "100%", width: "50%"}}/>
           <h4 className='mt-5'>Harsh Nihalani</h4>
           <h6>Founder</h6>
     </div>
     <div className="col-6 mt-5">
      <p>Hi, I'm Harsh, a React.js developer and the mind behind this Zerodha Clone.</p> <p>I built this app to replicate one of India’s top trading platforms as a challenge to sharpen my skills.</p> <p>Every component here — from the Hero section to the product pages — was crafted with real-world application in mind.</p>
     <p> I’m enthusiastic about clean UI, scalable code, and continuously improving my development skills.</p> <p>Feel free to check out my work on <a href='' style={{ textDecoration: "none"}}>GitHub</a></p>

     </div>
      </div>
    </div>
     );
}

export default Team;