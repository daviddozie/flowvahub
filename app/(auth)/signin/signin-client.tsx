'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { GoogleIcon } from "@/components/svg"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function SignInClient() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const verified = searchParams.get('verified')

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showVerifiedMessage, setShowVerifiedMessage] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (verified === 'true') {
            setShowVerifiedMessage(true)
            setTimeout(() => setShowVerifiedMessage(false), 5000)
        }
    }, [verified])

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData(prev => ({ ...prev, [name]: value }))

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const validateField = (name: string, value: string) => {
        let error = ""

        if (name === "email") {
            if (!value) error = "Email is required"
            else if (!emailRegex.test(value))
                error = "Enter a valid email address"
        }

        if (name === "password") {
            if (!value) error = "Password is required"
            else if (value.length < 8)
                error = "Password must be at least 8 characters"
        }

        setErrors(prev => ({ ...prev, [name]: error }))
        return error === ""
    }

    const validateForm = () => {
        return Object.entries(formData)
            .map(([key, value]) => validateField(key, value))
            .every(Boolean)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setLoading(true)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })

            if (error) {
                setErrors({ email: error.message })
                return
            }

            router.push("/dashboard")
        } catch (err: any) {
            setErrors({
                email: err.message || "Something went wrong. Please try again.",
            })
        } finally {
            setLoading(false)
        }
    }

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
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
                    Log in to Flowva
                </h1>

                <p className="text-[#6c7280] text-sm text-center font-medium mt-3">
                    Log in to receive personalized recommendations
                </p>

                {showVerifiedMessage && (
                    <div className="mt-5 flex items-center gap-3 text-xs rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">
                            Email verified successfully! You can now log in.
                        </span>
                    </div>
                )}

                {/* Email */}
                <div className="my-6 w-full">
                    <label className="text-sm">Email</label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`h-12 mt-2 ${errors.email &&
                            "focus-visible:ring-red-500/40 border-red-500/40"
                            }`}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="w-full">
                    <label className="text-sm">Password</label>
                    <div className="relative mt-2">
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className={`h-12 ${errors.password &&
                                "focus-visible:ring-red-500/40 border-red-500/40"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 cursor-pointer inset-y-0 text-xs text-primary flex items-center"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                    <div className="flex justify-end pt-2">
                        <Link href="/forgot-password" className="text-primary text-sm font-medium hover:underline">
                            forgot password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white rounded-4xl w-full h-12 mt-6"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="flex gap-4 items-center text-[#bfaafd] mt-6 text-sm">
                    <div className="border-t w-full" />
                    or
                    <div className="border-t w-full" />
                </div>

                <Button
                    variant="outline"
                    type="button"
                    onClick={signInWithGoogle}
                    className="w-full h-12 mt-6"
                >
                    <GoogleIcon />
                    Sign in with Google
                </Button>

                <p className="text-center text-gray-600 mt-4 text-sm">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </motion.form>
        </div>
    )
}