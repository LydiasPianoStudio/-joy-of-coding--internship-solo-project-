import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Link href="/auth/signin">Sign In</Link>
      <Link href="/signup">Sign Up</Link>
    </nav>
  );
}
