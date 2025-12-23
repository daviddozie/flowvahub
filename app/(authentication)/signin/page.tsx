import { Suspense } from "react"
import SignInClient from "./signin-client"

export default function SignIn() {
    return (
        <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
            <SignInClient />
        </Suspense>
    )
}
