
import Image from "next/image";
import Typography from "@/components/ui/typography";

const EmptyPage = () => {
  return (
    <div className="flex items-center justify-center flex-col " style={{ height: 'calc(100vh - 3.75rem)' }}>
      <Image
        src="/3dicons-setting-front-color.png"
        width={300}
        height={300}
        alt="Color"
      />
    </div>
  );
};

export default EmptyPage;