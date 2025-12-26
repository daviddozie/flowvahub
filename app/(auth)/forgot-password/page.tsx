'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Info } from "lucide-react"
import { motion } from "framer-motion"

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email) {
            setError("Email is required")
            return
        }

        if (!emailRegex.test(email)) {
            setError("Enter a valid email address")
            return
        }

        setLoading(true)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })

            if (error) {
                setError(error.message)
                return
            }

            setSuccess(true)
            setEmail("")
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <div className="bg-primary px-3 h-screen w-full flex items-center justify-center">
            <motion.form
               onSubmit={handleSubmit}
                className="bg-white rounded-xl p-7.5 w-full max-w-105"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="font-bold text-2xl text-primary text-center">
                    Reset Password
                </h1>

                <p className="text-[#6c7280] text-sm text-center font-medium mt-3">
                    Enter your email to receive a reset link
                </p>

                {success && (
                    <div className="mt-5 flex items-center gap-3 text-xs rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                        <Info className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="font-medium">
                            Password reset link sent. Please check your inbox.
                        </span>
                    </div>
                )}

                <div className="my-6 w-full">
                    <label className="text-sm">Email</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`h-12 mt-2 ${error && "focus-visible:ring-red-500/40 border-red-500/40"
                            }`}
                    />
                    {error && (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white rounded-4xl w-full h-12 mt-2"
                >
                    {loading ? "Sending link..." : "Send Reset Link"}
                </Button>

                <p className="text-center text-gray-600 mt-4 text-sm">
                    Remember your password?{" "}
                    <Link href="/signin" className="text-primary font-medium">
                        Sign in
                    </Link>
                </p>
            </motion.form>
        </div>
    )
}
