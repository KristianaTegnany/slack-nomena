"use client";
import useGetWorkspaceById from "@/hooks/useGetWorkspaceById";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import Image from 'next/image'
import { Input } from "@/components/ui/input";
import useCheckAuth from "@/hooks/useCheckAuth";
import { ChannelType, createChannel } from "@/lib/channel";
import { useRouter } from "next/navigation";
import useGetChannels from "@/hooks/useGetChannels";
import Offline, { useNetworkStatus } from "@/components/ui/offline";


type Params = { workspaceID: string }

export default function WorkspacePage({ params }: { params: Promise<Params> }) {
  const [channel, setChannel] = useState<string>('')
  const resolvedParams = React.use(params)
  const workspace = useGetWorkspaceById((resolvedParams.workspaceID)!)
  const user = useCheckAuth()
  const router = useRouter()

  const allChannels = useGetChannels(resolvedParams.workspaceID)
  const isOnline = useNetworkStatus()

  const [loading, setLoading] = useState(false)
  
  useEffect(() =>{
    if(allChannels?.length){
      router.push(`${resolvedParams.workspaceID}/${allChannels[0].id}`)
    }
  }, [allChannels])

  const handleCreateChannel = useCallback(async () => {
    setLoading(true)
    if (user && user.uid && channel.length) {
      const newChannel = {
        name: channel, createdBy: user.uid, workspaceId: resolvedParams.workspaceID
      } as ChannelType
      await createChannel(newChannel)
      router.push(`${resolvedParams.workspaceID}/${newChannel.id}`)
    }
    setLoading(false)
  }, [channel, user, resolvedParams])

  return !isOnline? <Offline /> : (
    (allChannels === undefined ? "loading..." : !allChannels.length && <div className="flex flex-col" style={{ height: 'calc(100vh - 3.75rem)' }}>
      <div className=" overflow-y-auto pb-8">
        <div className="flex-1 flex flex-col pb-4 mt-12">
          <div className="flex flex-col gap-y-2 h-full items-center justify-center">
            <div className="flex items-center gap-x-4">
              <Image
                src="/3dicons-chat-bubble-front-color.png"
                width={120}
                height={120}
                alt="Slack logo"
              />
              <div className="flex flex-col justify-start items-start gap-y-3">
                <Typography text={workspace?.name || ''} variant="h1" className=" text-slate-800 text-start" />
              </div>
            </div>
            <div className='max-w-[460px]'>
              <Typography
                text='Create new channel first'
                variant='h2'
                className='mb-3'
              />
              <Input placeholder='Channel name...' onChange={({ target: { value } }) => setChannel(value)} />
              <Button
                disabled={loading}
                onClick={handleCreateChannel}
                variant='secondary'
                className=' bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white flex space-x-3 py-6'
                type='submit'
              >
                <Typography text='Create Channel' variant='p' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
};
