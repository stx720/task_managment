import Form from "../components/form";
import Github from "../components/github";
import SmallLogo from "../components/logo-small";
import AnimatedComponent from "../components/animated";
import Dates from "../components/date";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 w-screen animate-fade ">
      <SmallLogo />
      <Dates />
      <Github />
    </main>
  );
}
