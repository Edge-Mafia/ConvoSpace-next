import React from 'react';
import './style.css'

const HeroArea = () => {    
  return (
    <div className={`hero-area content-center text-white`}>
        <div className="flex flex-col lg:flex-row items-center lg:items-start py-24 px-[5%] bg-background text-foreground justify-between">
          <h1 className="text-5xl font-bold mb-4 flex-initial text-center lg:w-2/6">Robust Virtual Networking Solutions for Professionals</h1>
          
          <div className="pt-5 w-fit">
              <form action="#" method="post">
                <div className="flex items-center mb-4 space-x-5 bg-white rounded-3xl">
                  <input type="email" placeholder="name@domain.com" className="border border-border rounded-3xl border-r-0 p-2 focus:outline-none focus:ring focus:ring-ring" />
                  <button className="bg-accent text-accent-foreground rounded-3xl text-black font-medium leading-[26px] px-4 py-2 hover:bg-accent/80 bg-[#CCFF8B] h-full">Subscribe Now</button>
                </div>
              </form>
              <div className="flex items-center mt-3 mb-4">
                <span className="text-green-500">★★★★★</span>
                <span className="ml-2 text-[#ffffffcc]">Rated 5 Stars</span>
              </div>
              <p className="text-[#ffffff7f]">97% believe ConvoSpace is exceptional!</p>
          </div>
        </div>

        <span
          data-displayname="image" 
          className="block w-full h-[570px] md:max-w-[1300px] md:max-h-[600px] md:min-h-[550px] relative mx-auto pt-20"
        >
          <img
            id="Video sectionjxc9-id" 
            src="/img1.jpg" 
            alt="Image"
            className="w-full h-full object-cover" 
          />
        </span>
    </div>
  );
};

export default HeroArea;