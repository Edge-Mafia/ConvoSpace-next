import React from 'react'
import './style.css'

export default function KeyFeatures() {
  return (
    <div className="key-features py-24 px-[5%] bg-[#EEEFE7]">
        <div>
            <h2 className="text-3xl font-bold text-center h-fit h-min-2.5 w-min-4 w-max-xl mb-0">
                Key Features of ConvoSpace
            </h2>
            <h3 className="text-3xl font-bold mt-0 text-center mb-12 h-fit h-min-2.5 w-min-4 w-max-xl">
                Platform Unveiled
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-12 flex flex-col items-center rounded-md shadow-md text-center w-full max-w-96 h-auto">
            <Icons.minimize />
              <h3 className="text-lg font-semibold mt-4 leading-6 pt-6 pb-2.5">Instant Connect</h3>
              <p className="text-[#12141db2] font-normal mt-2">Effortlessly connect with professionals globally in real-time.</p>
            </div>

            <div className="bg-white p-12 flex flex-col items-center rounded-md shadow-md text-center w-full max-w-96 h-auto">
              <Icons.maximize />
              <h3 className="text-lg font-semibold mt-4 leading-6 pt-6 pb-2.5">Secure Communication</h3>
              <p className="mt-2 text-[#12141db2] font-normal">Experience encrypted and private interaction features.</p>
            </div>

            <div className="bg-white flex flex-col items-center p-12 rounded-md shadow-md text-center w-full max-w-96 h-auto">
              <Icons.tools />
              <h3 className="text-lg font-semibold mt-4 leading-6 pt-6 pb-2.5">Event Management Tools</h3>
              <p className="text-[#12141db2] font-normal mt-2">Manage events seamlessly with powerful tools.</p>
            </div>
        </div>
    </div>
  )
}


const Icons = {
    maximize: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity=".5"/><path fill="currentColor" fill-rule="evenodd" d="M16.656 2.75a.75.75 0 0 1 0-1.5H22a.75.75 0 0 1 .75.75v5.344a.75.75 0 0 1-1.5 0V3.81l-7.44 7.439H16a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75V8a.75.75 0 0 1 1.5 0v2.19l7.44-7.44z" clip-rule="evenodd"/></svg>
    ),

    minimize: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity=".5"/><path fill="currentColor" fill-rule="evenodd" d="M16.5 12a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V8.25a.75.75 0 0 1 1.5 0v1.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-3.72 3.72h1.94a.75.75 0 0 1 .75.75" clip-rule="evenodd"/><path fill="currentColor" d="M2 17.5c0-2.121 0-3.182.659-3.841C3.318 13 4.379 13 6.5 13c2.121 0 3.182 0 3.841.659.659.659.659 1.72.659 3.841 0 2.121 0 3.182-.659 3.841C9.682 22 8.621 22 6.5 22c-2.121 0-3.182 0-3.841-.659C2 20.682 2 19.621 2 17.5"/></svg>
    ),

    tools: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M16.471 16.471c4.939-4.939 6.94-10.944 4.471-13.413-2.469-2.47-8.474-.468-13.413 4.47-4.939 4.94-6.94 10.945-4.471 13.414 2.47 2.47 8.475.468 13.413-4.47" opacity=".3"/><path fill="currentColor" d="M7.529 16.471C2.59 11.533.589 5.527 3.058 3.058c2.469-2.47 8.474-.468 13.413 4.47 4.939 4.94 6.94 10.945 4.471 13.414-2.47 2.47-8.475.468-13.413-4.47" opacity=".3"/><path fill="currentColor" d="M14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/></svg>
    )
}
