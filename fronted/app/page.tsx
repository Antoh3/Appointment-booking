"use client";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, []);

  return (
    <main className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1>Getting everything ready</h1>
      <Spinner />
      <Link className="text-blue-500" href="./auth">
        Jump to auth
      </Link>
    </main>
  );
}
