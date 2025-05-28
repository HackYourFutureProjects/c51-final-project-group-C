// 👇 This is Sidebarcomponent, for now we use it to display the sidebar in the Private variant of profile page.
//  For now it uses two subcomponents inside: ProfileInfo and Tabs (vertical variant).

// It expects such props:
// profileInfo: object with profile information (name, surname, country, publishedTripPlans, timesCopied)
// activeTabId: id of the active tab
// onTabChange: function to change the active tab
// tabItems: array of tab items (id, label, icon (optional))

import ProfileInfo from "./ProfileInfo";
import Tabs from "./Tabs";

const ProfilePageSidebar = ({
  profileInfo,
  activeTabId,
  onTabChange,
  tabItems,
}) => {
  return (
    <div className="sidebar-container lg:col-span-1 border-border border rounded-lg p-4 lg:min-h-[calc(100vh-8rem)]">
      <div className="sidebar-content space-y-6">
        <ProfileInfo profileInfo={profileInfo} />
        <Tabs
          items={tabItems}
          activeTabId={activeTabId}
          onChange={onTabChange}
          type="vertical"
        />
      </div>
    </div>
  );
};

export default ProfilePageSidebar;
