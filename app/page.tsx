import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/signup">SignUp</Link>

      <Link href="/signin">SignIn</Link>
    </>
  );
}
