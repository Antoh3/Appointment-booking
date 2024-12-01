"use client";
// import '@/styles/App.css'
// import '@/styles/index.css'

import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { message } from "antd";
import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";

function Login() {

    // user defined email and password states
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    // when user clicks on Login Button
    const loginUser = async () => {

        // input validation 
        if (inputEmail === "" && inputPassword !== "") {
            message.error("Input correct password")
            return

        }
        if (inputEmail !== "" && inputPassword === "") {
            message.error("Input correct email")
            return
        }
        if (inputEmail === "" && inputPassword === "") {
            message.error("Input email and password")
            return
        }
        let flag = true
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail)) flag = false;


        if (flag) {
            message.error("Invalid email address")
            return
        }





        try {


        } catch (error) {

            return
        }

    }


    return (
        <>
            <div >
                <div className="">
                    <div className="signup_container">
                        <div className="flex flex-col space-y-2 text-center">
                            <h2 className="text-2xl font-semibold tracking-tight">Welcome 👋</h2>
                            <Image
                                alt="logo"
                                className="mx-auto mb-2"
                                height={200}
                                src="/dokta-logo.svg"
                                width={50}
                            />
                        </div>
                        <h1>Login</h1>
                        <p>Email:</p>
                        <input type="email" placeholder="Enter your email address" onChange={(e) => { setInputEmail(e.target.value) }} />
                        <p>Password:</p>
                        <input type="password" placeholder="Enter your password" onChange={(e) => { setInputPassword(e.target.value) }} />

                        <motion.button
                            whileTap={{ scale: 0.9 }} onClick={loginUser} >
                            Login
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </motion.button>
                        <Link href={"/auth/register"}>Don't have an account? Signup using this link</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;