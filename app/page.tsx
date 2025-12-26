import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/signup">SignUp</Link>
        <br /> <br />
      <Link href="/signin">SignIn</Link>
    </>
  );
}
