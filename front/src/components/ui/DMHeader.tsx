import Typography from "./typography";
import { Button } from "./button";
import { Headset } from "lucide-react";
import Image from "next/image";


export const DMHeader: React.FC<{ name: string; id: string; urlProfile : string }> = ({ name, id, urlProfile }) => {
  return (
    <div className=" space-y-4 my-3">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-x-2">
          <Image src={urlProfile} alt="slack" width={40} height={40}  className=" rounded-full"/>
          <Typography text={`${name}`} variant="h4" />
        </div>
      </div>
    </div>
  );
};