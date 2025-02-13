"use client"
import { getSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const useCheckAuth = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const userData = getSession()
    if (!userData) {
      router.push("/login");
    } else {
      setUser(userData)
    }
  }, [])

  return user
}

export default useCheckAuth