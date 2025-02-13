
import Typography from "./typography";
import { Button } from "./button";
import { Settings } from "lucide-react";


export const ChannelHeader: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  return (
    <div className=" space-y-4 my-3">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-baseline gap-x-2">
          <Typography text={`#${name}`} variant="h3" />
        </div>
      </div>
    </div>
  );
};