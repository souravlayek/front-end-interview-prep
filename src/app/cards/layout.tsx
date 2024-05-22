import React from "react"
import Navbar from "./components/Navbar";

const Layout = ({children}: {
    children: React.ReactNode
}) => {
  return (
    <main className="relative">
      <div className="mt-2 flex w-full justify-center absolute top-0">
        <div className="border border-white/30 w-fit rounded-md">
          <Navbar />
        </div>
      </div>
      {children}
    </main>
  );
}

export default Layout