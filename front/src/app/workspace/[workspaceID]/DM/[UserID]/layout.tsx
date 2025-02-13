"use client";

import { Loader } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import DirectMessagesSidebar from "@/components/ui/directMessagesSidebar";


import React, { ReactNode, Usable } from "react";

type Params = { workspaceID: string, UserID: string }

export default function ChannelPage({ params, children }: { params: Usable<Params>, children: ReactNode }) {
  const resolvedParams = React.use(params);
  const { workspaceID, UserID } = resolvedParams
  const showPanel = false;

  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="wck-workspace-layout"
    >
      <ResizablePanel
        defaultSize={20}
        minSize={11}
        className="bg-[#5E2C5F]"
      >
        <DirectMessagesSidebar workspaceID={workspaceID} userID={UserID} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80} minSize={20}>
        {children}
      </ResizablePanel>
      {showPanel && (
        <>
          <ResizableHandle />
          <ResizablePanel minSize={20} defaultSize={29}>



          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
