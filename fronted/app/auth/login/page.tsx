"use client";
// import '@/styles/App.css'
// import '@/styles/index.css'

import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { message } from "antd";
import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";
import createAxiosInstance from "@/app/context/axiosInstance";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

function Login() {

    // user defined email and password states
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const axiosInstance = createAxiosInstance();
    const { setTokens } = useAuth();
    const router = useRouter();

    const handleInputChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }
    // when user clicks on Login Button
    const loginUser = async () => {
        // setTimeout(() => {
            // input validation 
            if (formData.email === "" && formData.password !== "") {
                message.error("Input correct password")
                return
            }
            if (formData.email !== "" && formData.password === "") {
                message.error("Input correct email")
                return
            }
            if (formData.email === "" && formData.password === "") {
                message.error("Input email and password")
                return
            }
            let flag = true
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) flag = false;

            if (flag) {
                message.error("Invalid email address")
                return
            }
        // }, 2000)

        try {
            const response = await axiosInstance.post("/patient/login",formData);
            const { accessToken, refreshToken} = response.data;
            setTokens(accessToken,refreshToken);

            if (response?.status === 200) {
                message.success("Login successful.");
                console.log("Login successful: ", response.data);
                router.push("/patient");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    message.error("Invalid email or password");
                }
            }else{
                message.error("An error occured");
            }
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
                        <input type="email" name="email" value={formData.email} placeholder="Enter your email address" onChange={handleInputChange} />
                        <p>Password:</p>
                        <input type="password" name="password" value={formData.password} placeholder="Enter your password" onChange={handleInputChange} />

                        <motion.button
                            whileTap={{ scale: 0.9 }} onClick={loginUser} >
                            Login
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </motion.button>
                        <Link href={"/auth/register"}>Don't have an account? Signup</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;