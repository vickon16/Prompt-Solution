"use client";

import React from 'react'
import {SessionProvider} from "next-auth/react"
import { Session } from 'next-auth';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProviderProps = {
  children : React.ReactNode,
  session? : Session | null
}

const Provider = ({children, session} : ProviderProps) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
    </SessionProvider>
  )
}

export default Provider