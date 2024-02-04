import Link from "next/link";
import Image from "next/image";
import Logo from "./components/home-logo";
import Button from "./components/button";
import ExpandableInfo from "./components/dropdown";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-screen">
      <Logo />
      <Link href="/">
        {" "}
        <Button />
      </Link>
      <ExpandableInfo />
      
      
    </main>
  );
}
