import React, { useMemo, useState } from 'react';
import { Button } from './button';
import useGetActivities from '@/hooks/useGetActivities';
import ActivityItem from './activityItem';

type Props = {
  workspaceId: string,
}

const ActivitiesSidebar = (props: Props) => {
  const { workspaceId } = props
  const [activeTab, setActiveTab] = useState("All");
  const activities = useGetActivities(workspaceId)

  const filteredActivities = useMemo(() => activities.filter(activity =>
    activeTab === "All" || activity.type === activeTab
  ), [activities])
  return (
    <div className="flex flex-col h-full bg-white p-4 space-y-8">
      <header>
        <h2 className="text-xl font-bold">Activities</h2>
      </header>
      <div className="mb-4 flex">
        {["All", "Message", "File"].map(tab => (
          <Button
            key={tab}
            className={`text-black bg-transparent mx-0 rounded-none font-bold hover:bg-black/20 ${activeTab === tab && ' border-b-4 border-black'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredActivities.map(activity => (
          <ActivityItem key={JSON.stringify(activity)} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesSidebar;