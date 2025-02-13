"use client"
import useCheckAuth from "@/hooks/useCheckAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  const user = useCheckAuth()

  useEffect(() => {
    if(user) router.push("workspace")
    else router.push("login")
  }, [user])
}
