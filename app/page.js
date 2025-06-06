import Link from "next/link";
import Image from "next/image";
import Logo from "./components/home-logo";
import Button from "./components/button";
import ExpandableInfo from "./components/dropdown";
import Github from "./components/github";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-screen animate-fade ">
      <Logo />
      <Link href="pages/tasks">
        <Button />
      </Link>
      <ExpandableInfo />

      <Github />
    </main>
  );
}
