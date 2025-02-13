import React, { useState } from 'react';
import { Button } from './button';
import { Message } from './message';

// Mock implementation of useGetActivities
const useGetActivities = () => {
  return {
    data: [
      { id: "1", type: "Message", content: "John Doe sent a message" },
      { id: "2", type: "File", content: "Jane Smith uploaded a file" },
      { id: "3", type: "Message", content: "John Doe sent another message" },
      { id: "4", type: "Message", content: "Apha jedidia sent a message" },
      { id: "5", type: "File", content: "John Smith uploaded a file" },
      { id: "6", type: "Message", content: "John Doe sent another message" },
    ],
    isLoading: false,
  };
};

const ActivitiesSidebar = () => {
  const { data: activities, isLoading: isLoadingActivities } = useGetActivities();
  const [activeTab, setActiveTab] = useState("All");

  if (isLoadingActivities) {
    return <div>Loading...</div>;
  }

  const filteredActivities = activities.filter(activity => 
    activeTab === "All" || activity.type === activeTab
  );

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
        {filteredActivities.map((activity, key) => (
          <Message key={key} time='' avatar='/profil.png' name='Nomena Faliana' text={activity.content} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesSidebar;