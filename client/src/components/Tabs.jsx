/* 👇 This is a reusable component for tabs. 'type' prop can be passed to have horizontal/vertical version.
(We already use vertical variant for private profile page view, and horizontal for public profile page view).

For 'items' prop it expects an array of objects, where each object has such structure:

{
  id: number or name of the tab (we just need some id to use as a key)
  label: name of the tab (this is what will be displayed as text in the tab button)
  icon: optional icon to display in the tab
}

Example of usage:

const menuItems = [ 
  { id: 1, label: "Home" },
  { id: 2, label: "Profile" },
  { id: 3, label: "Settings" },
];

<Tabs items={menuItems} activeTabId={1} onChange={setActiveTabId} type="horizontal" />

*/

const Tabs = ({ items, activeTabId, onChange, type = "horizontal" }) => {
  const isActiveTab = (id) => activeTabId === id;

  return (
    <nav className={`tabs tabs-${type}`}>
      <div
        className={
          type === "horizontal"
            ? "tabs-list flex justify-center space-x-8"
            : "tabs-list flex flex-col space-y-2"
        }
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`
              tab-button 
              flex items-center space-x-2 py-4
              ${type === "horizontal" ? "border-b-2" : "w-full rounded-lg px-4"}
              ${
                isActiveTab(item.id)
                  ? type === "vertical"
                    ? "bg-accent text-background"
                    : "border-accent"
                  : "text-text border-transparent hover:text-accent"
              }
            `}
          >
            {item.icon && <item.icon className="tab-icon w-5 h-5" />}
            <span className="tab-label text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Tabs;
