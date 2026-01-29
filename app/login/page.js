import Form from "../components/form";
import Github from "../components/github";
import Logo from "../components/home-logo";
import AnimatedComponent from "../components/animated";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center lg:p-24 w-screen animate-fade ">
      <Logo />
      <Form />
      <Github />
    </main>
  );
}
