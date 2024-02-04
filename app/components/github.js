import Image from "next/image"; 
import Link from "next/link";
const Github = () => {
    return (
       <div className="flex flex-row fixed bottom-1 right-3">
   <Link href="https://github.com/stx720" target="_blank" className=" transition hover:scale-110"> <Image src="/github.svg"  width={32} height={32} alt="github"></Image></Link>
       </div>
    );
  };
  
  export default Github;