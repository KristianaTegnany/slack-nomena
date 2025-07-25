"use client";

import { Loader } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import SettingSidebar from "@/components/ui/settingSidebar";


import { ReactNode } from "react";

export default function settingPage({ params, children }: { params: { workspaceID: string, channelID: string }, children: ReactNode }) {
  const showPanel = false; // Define showPanel variable
  const parentMessageId = null; // Define parentMessageId variable
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
          <SettingSidebar />
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
