// 👇 This is Grid component, for now we use it to display the grid of cards in different tabs of the ProfilePage and PublishedTripPage.
// Later on we can also reuse it for HomePage, etc.
// It automatically creates a grid layout for the elements passed as children.

const Grid = ({ children, columns = 3 }) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 xs:grid-cols-2",
    3: "grid-cols-1 xs:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  };

  return <div className={`grid gap-4 ${gridClasses[columns]}`}>{children}</div>;
};

export default Grid;
