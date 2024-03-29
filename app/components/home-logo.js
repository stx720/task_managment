import Link from "next/link";

const Logo = () => {
    return (
      <Link href="/" className="cursor-pointer">
      <div className="font-custom flex flex-row items-center">
        <div className="flex flex-row justify-center">
          <h1 className="flex text-center transition text-4xl md:text-7xl lg:text-8xl  hover:scale-125">T</h1>
          <h1 className="flex text-center transition text-4xl md:text-7xl lg:text-8xl hover:scale-125">A</h1>
          <h1 className="flex text-center transition text-4xl md:text-7xl lg:text-8xl  hover:scale-125">S</h1>
          <h1 className="flex text-center transition text-4xl md:text-7xl lg:text-8xl  hover:scale-125">K</h1>
          <h1 className="flex text-center transition text-4xl md:text-7xl lg:text-8xl  ">_</h1>
        </div>
        <div className="flex flex-row justify-center">
          <h1 className="flex text-center transition text-4xl md:text-7xl lg:text-8xl hover:scale-125">L</h1>
          <h1 className="flex text-center transition text-4xl md:text-7xl lg:text-8xl hover:scale-125">I</h1>
          <h1 className="flex text-center transition text-4xl md:text-7xl lg:text-8xl hover:scale-125">S</h1>
          <h1 className="flex text-center transition text-4xl md:text-7xl lg:text-8xl hover:scale-125">T</h1>
        </div>
      </div>
      </Link>
    );
  };
  
  export default Logo;