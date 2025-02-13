"use client";

import { useRouter } from "next/navigation";
import { MdOutlineMailOutline, MdOutlineAdd } from "react-icons/md";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import useCheckAuth from "@/hooks/useCheckAuth";
import useGetWorkspace from "@/hooks/useGetWorkspace";

const WorkspaceSelection = () => {
  const router = useRouter()

  const user = useCheckAuth()
  const workspaces = useGetWorkspace()


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="max-w-[460px] text-center space-y-5">
        {/* Logo & Title */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <Image src="/slack.svg" width={30} height={30} alt="Slack Logo" />
          <Typography text="Slack Clone" variant="h3" />
        </div>

        <Typography text="Get started with Slack" variant="h2" className="mb-3" />
        {user && <div className="flex items-center justify-center my-6">
          <Image src={user.picture ? user.picture : "/profil.png"} width={50} height={50} alt="User Avatar" className="rounded-full" />
          <Typography text={`Welcome ${user.name}`} variant="h4" className="ml-3" />
        </div>}

        <Typography text="Choose an option to continue" variant="p" className="opacity-80 mb-6" />

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <Button
            variant="outline"
            className="py-6 border-2 flex items-center space-x-3"
            onClick={() => router.push("/workspace/join")}
          >
            <MdOutlineMailOutline size={20} />
            <Typography text="Join a Workspace" variant="p" />
          </Button>

          <div className='flex items-center my-6'>
            <div className='mr-[10px] flex-1 border-t bg-neutral-300' />
            <Typography text='OR' variant='p' />
            <div className='ml-[10px] flex-1 border-t bg-neutral-300' />
          </div>

          <Button
            variant="secondary"
            className="py-6 bg-primary-light text-white flex items-center space-x-3 hover:bg-primary-dark"
            onClick={() => router.push("/workspace/create")}
          >
            <MdOutlineAdd size={20} />
            <Typography text="Create a New Workspace" variant="p" />
          </Button>
        </div>

        {
          Boolean(workspaces.length) && <div className="flex flex-col space-y-0">
            <Typography text="Your workspace(s)" variant="p" className="opacity-50 mb-1" />
            {
              workspaces.map((ws, i) => {
                return <Button onClick={() => router.push(`/workspace/${ws.id}`)} key={JSON.stringify(ws) + i} variant={'link'} className="flex flex-col space-y-0">
                  <Typography text={ws.name} variant="p" />
                </Button>
              })
            }

          </div>
        }

      </div>
    </div>
  );
};

export default WorkspaceSelection;
