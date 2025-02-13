"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ActivitiesSidebar from "@/components/ui/activitiesSidebar";

type Params = { workspaceID: string, channelID: string }

import React, { ReactNode, Usable } from "react";

export default function ChannelPage({ params, children }: { params: Usable<Params>, children: ReactNode }) {
  const showPanel = false;
  const { workspaceID } = React.use(params);

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
        <ActivitiesSidebar workspaceId={workspaceID} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80} minSize={20}>
        {children}
      </ResizablePanel>
      {showPanel && (
        <>
          <ResizableHandle />
          <ResizablePanel minSize={20} defaultSize={29} />
        </>
      )}
    </ResizablePanelGroup>
  );
}
