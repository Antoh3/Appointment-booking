import React from 'react'
import LoginForm from '@/components/forms/LoginForm'
import Image from 'next/image'

function Login() {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container ">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        alt="patient"
                        height={1000}
                        width={1000}
                        className="mb-12 h-10 w-fit"
                    />

                    <LoginForm user={null} /> {/* Passing null instead of user */}

                    <p className="copyright py-12">
                        © 2024 CarePluse
                    </p>
                </div>
            </section>

            <Image
                src="/assets/images/register-img.png"
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[40%]"
            />
        </div>
    )
}

export default Login