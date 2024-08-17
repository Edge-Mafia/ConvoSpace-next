import React from 'react'
import './style.css'

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 px-[5%] bg-background">
      <div className="flex items-end space-x-24">
        <div className="text-2xl font-bold text-primary">ConvoSpace</div>
        <ul className="flex space-x-6">
          <li><a href="#" className="text-muted hover:text-muted-foreground">Home</a></li>
          <li><a href="#" className="text-muted hover:text-muted-foreground">About</a></li>
          <li><a href="#" className="text-muted hover:text-muted-foreground">Features</a></li>
          <li><a href="#" className="text-muted hover:text-muted-foreground">Testimonial</a></li>
          <li><a href="#" className="text-muted hover:text-muted-foreground">Contact</a></li>
        </ul>
      </div>
      <div className="flex space-x-10">
        <a href="#" className="text-muted hover:text-muted-foreground py-2">Log In</a>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full bg-[#162D3C] hover:bg-secondary/80 text-white">Sign Up</button>
      </div>
    </nav>
  )
}
