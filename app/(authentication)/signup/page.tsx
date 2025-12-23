'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { GoogleIcon } from "@/components/google"
import { Info } from "lucide-react"

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

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
            else if (!emailRegex.test(value)) error = "Enter a valid email address"
        }

        if (name === "password") {
            if (!value) error = "Password is required"
            else if (value.length < 8)
                error = "Password must be at least 8 characters"
        }

        if (name === "confirmPassword") {
            if (!value) error = "Please confirm your password"
            else if (value !== formData.password)
                error = "Passwords do not match"
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
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) {
                console.error('Signup error:', error)
                setErrors({ email: error.message })
                return
            }

            console.log('Signup successful:', data)
            setSuccess(true)
            setErrors({})
            setFormData({
                email: "",
                password: "",
                confirmPassword: "",
            })
        } catch (err: any) {
            setErrors({
                email: err.message || "Something went wrong. Please try again.",
            })
        } finally {
            setLoading(false)
        }
    }

    const signUpWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="bg-primary px-3 h-screen w-full flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-7.5 w-full max-w-105"
            >
                <h1 className="font-bold text-2xl text-primary text-center">
                    Create Your Account
                </h1>

                <p className="text-[#6c7280] text-sm text-center font-medium mt-3">
                    Sign up to manage your tools
                </p>

                {success && (
                    <div className="mt-5 flex items-center gap-3 text-xs rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                        <Info className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="font-medium">
                            Account created successfully! You can now log in.
                        </span>
                    </div>
                )}

                <div className="my-6 w-full">
                    <label className="text-sm">Email</label>
                    <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
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
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
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
                </div>

                <div className="w-full mt-4">
                    <label className="text-sm">Confirm Password</label>
                    <div className="relative mt-2">
                        <Input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className={`h-12 ${errors.confirmPassword &&
                                "focus-visible:ring-red-500/40 border-red-500/40"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 cursor-pointer inset-y-0 text-xs text-primary flex items-center"
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white rounded-4xl w-full h-12 mt-6"
                >
                    {loading ? "Creating account..." : "Sign Up Account"}
                </Button>

                <div className="flex gap-4 items-center text-[#bfaafd] mt-6 text-sm">
                    <div className="border-t w-full" />
                    or
                    <div className="border-t w-full" />
                </div>

                <Button
                    variant="outline"
                    type="button"
                    onClick={signUpWithGoogle}
                    className="w-full h-12 mt-6"
                >
                    <GoogleIcon />
                    Sign up with Google
                </Button>

                <p className="text-center text-gray-600 mt-4 text-sm">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-primary font-medium">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    )
}