"use client";

import Link from "next/link";
import VerifyLocation from "@/components/VerifyLocation";
import { motion } from "framer-motion";
import { message } from "antd";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import Image from "next/image";

import { useState, useEffect } from "react";

function Register() {
    // State variables for user input
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("male");
    const [dob, setDob] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loc, setLoc] = useState();
    const [currentStep, setCurrentStep] = useState(1); // Track the current form step

    const locationStatus = async () => {
        await VerifyLocation()
            .then((l: any) => setLoc(l))
            .catch(async (e) => {
                message.warning("Please allow location");
                setTimeout(async () => {
                    await VerifyLocation()
                        .then((l: any) => setLoc(l))
                        .catch((e) => {
                            message.error(
                                "Location is required to run the app. Please allow location!"
                            );
                        });
                }, 3000);
            });
    };

    // Function to validate basic details (called before moving to step 2)
    const verifyBasicDetails = async () => {
        await locationStatus();

        if (firstName === "") {
            message.warning("First name is empty");
            return false;
        }
        if (lastName === "") {
            message.warning("Last name is empty");
            return false;
        }
        if (
            dob === "" ||
            Number(dob.substring(0, 4)) > 2007 // Year format check
        ) {
            message.warning("Age should be at least 15 years");
            return false;
        }
        return true;
    };

    // Handle form submission (signup)
    const signupUser = async () => {
        if (!await verifyBasicDetails()) {
            message.error("Something went wrong!");
            return false;
        }

        // Email validation using regular expression
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(inputEmail)) {
            message.error("Invalid email address");
            return false;
        }

        // Phone number validation (optional)
        // if (phone < 3000000000 || phone > 3999999999) {
        //   message.error("Invalid phone number");
        //   return false;
        // }

        if (password === "" || repeatPassword === "") {
            message.warning("Password is empty");
            return false;
        }
        if (password !== repeatPassword) {
            message.error("Password mismatch");
            return false;
        }
        if (password.length < 8) {
            message.error("Password length must be greater than 7");
            return false;
        }

        // Handle signup logic here (e.g., call an API to create a user)
        console.log("Signup details:", {
            firstName,
            lastName,
            gender,
            dob,
            email: inputEmail,
            phone,
            password,
        });

        // Reset form state after successful signup (optional)
        // setFirstName("");
        // // ... reset other fields
    };

    // Handle "Next" button click
    const handleNext = async () => {
        if (currentStep === 1 && !(await verifyBasicDetails())) {
            return; // Prevent going to step 2 if validation fails
        }
        setCurrentStep(currentStep + 1);
    };

    // Handle "Previous" button click
    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <>
            <div >
                <div className="">
                    <div className="signup_container">
                        <div className="flex flex-col space-y-2 text-center">
                            <Image
                                alt="logo"
                                className="mx-auto mb-2"
                                height={200}
                                src="/dokta-logo.svg"
                                width={50}
                            />
                            <h2 className="header">Hello 👋</h2>
                            {/* <p className="text-dark-700">Let us know more about yourself.</p> */}
                            <h1 className="text-2xl font-semibold tracking-tight">
                                SignUp
                            </h1>
                        </div>

                        {currentStep === 1 && (
                            <div id="signup_container_1">
                                <p>First Name:</p>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName} // Set initial value
                                />
                                <p>Last Name:</p>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName} // Set initial value
                                />
                                <p>Gender:</p>
                                <select defaultValue={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                                <p>Birthday:</p>
                                <input
                                    type="date"
                                    placeholder="Enter your birthday"
                                    onChange={(e) => setDob(e.target.value)}
                                    value={dob}
                                />

                                <motion.button
                                    onClick={handleNext}
                                    whileTap={{ scale: 0.9 }}
                                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
                                >
                                    Next <BiSolidRightArrow />
                                </motion.button>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div id="signup_container_3" style={{ display: 'block' }}>
                                <p>Email:</p>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    onChange={(e) => setInputEmail(e.target.value)}
                                    value={inputEmail} // Set initial value
                                />
                                <p>Phone Number:</p>
                                <input
                                    type="number"
                                    placeholder="e.g 03181236267"
                                    onChange={(e: any) => setPhone(e.target.value)}
                                    value={phone}
                                />

                                <p>Password:</p>
                                <input
                                    type="password"
                                    placeholder="Enter strong password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password} // Set initial value
                                />
                                <p>Repeat Password:</p>
                                <input
                                    type="password"
                                    placeholder="Enter strong password"
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    value={repeatPassword} // Set initial value
                                />

                                <motion.button
                                    onClick={handlePrevious}
                                    whileTap={{ scale: 0.9 }}
                                    id="previous"
                                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
                                >
                                    <BiSolidLeftArrow /> Previous
                                </motion.button>

                                <motion.button
                                    onClick={signupUser}
                                    whileTap={{ scale: 0.9 }}
                                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
                                >
                                    Signup <FaUserPlus />
                                </motion.button>
                            </div>
                        )}

                        <Link href={"/auth/login"}>Already have an account? Signin using this link</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;