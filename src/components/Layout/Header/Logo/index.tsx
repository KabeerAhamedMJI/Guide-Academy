// import { getImagePrefix } from "@/utils/util";
export const getImagePrefix = () => "/";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="block">
      <Image
        src={`${getImagePrefix()}images/logo/logo.svg`}
        alt="Guide Academy"
        width={130}   // <- controls size
        height={50}
        priority
      />
  
    </Link>
  );
};

export default Logo;
