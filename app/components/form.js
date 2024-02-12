import Link from "next/link";

const Form = () => {
  return (
    <div className="mt-10 border-gray-400 border-2 border-opacity-100 flex flex-col justify-center lg:min-h-72 h-80  lg:w-5/12 w-fit rounded-lg bg-gradient-to-r bg-gray-300 p-1 ">
      <form className="flex flex-col items-center justify-center">
        <h1 className=" text-center font-custom font-bold text-gray-600 lg:text-3xl text-xl mb-5 ">
          You need to log in
        </h1>
        <input
          type="email"
          placeholder="E-mail address"
          required
          className=" flex mb-3 pl-3 font-serif  lg:w-80 lg:text-lg  rounded-full p-1 scale-110  w-72 outline-none border-gray-500 placeholder:focus:opacity-25"
        />
        <input
          type="password"
          placeholder="password"
          required
          className="mb-4 pl-3 rounded-full  lg:min-w-80 lg:text-lg  font-serif  p-1 scale-110 w-72 outline-none border-gray-500 placeholder:focus:opacity-25"
        />
        <button
          type="submit"
          className="bg-gray-600 font-bold text-white px-4 py-2 rounded-xl lg:scale-105 transition hover:scale-110"
        >
          Log in
        </button>
        <Link
          href=""
          className="border-dotted lg:text-base text-sm border-b-2 mt-2 mb-2 font-semibold border-black transition duration-200 hover:opacity-45"
        >
          Forgot your password?
        </Link>
        <button
          type="submit"
          className="  self-start  -mb-7 lg:mt-0 mt-5 ml-auto lg:mr-3 w-fit text-sm scale-90 lg:scale-105 text-white bg-black border border-black px-4 py-2 rounded-xl transition hover:scale-100 lg:hover:scale-110"
        >
          Create account
        </button>
      </form>
    </div>
  );
};
export default Form;
