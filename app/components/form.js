const Form = () => {
  return (
    <div className="mt-10 border-dashed border-gray-500 border-4 border-opacity-100 flex flex-col justify-center lg:min-h-72 h-80  lg:w-5/12 w-fit rounded-lg bg-gradient-to-r bg-gray-300 p-1 ">
      <form className="flex flex-col items-center justify-center">
        <h1 className=" text-center font-custom lg:text-3xl text-xl mb-5">
          You need to log in
        </h1>
        <input
          type="email"
          placeholder="e-mail"
          required
          className="mb-4 pl-1 scale-125 rounded-md outline-none border-gray-500 border placeholder:focus:opacity-25  "
        />
        <input
          type="password"
          placeholder="password"
          required
          className="mb-4 pl-1 rounded-md scale-125 border border-gray-500 placeholder:focus:opacity-25"
        />
        <button
          type="submit"
          className="bg-gray-600 font-bold text-white px-4 py-2 rounded-xl lg:scale-105 transition hover:scale-110"
        >
          Log in
        </button>
        <div></div>
      </form>
      <button
        type="submit"
        className="  self-start  -mb-10 lg:mt-0 mt-5 ml-auto lg:mr-3 w-fit text-sm scale-90 lg:scale-105 text-white bg-black border border-black px-4 py-2 rounded-xl transition hover:scale-100 lg:hover:scale-110"
      >
        Create account
      </button>
    </div>

  );
};
export default Form;
