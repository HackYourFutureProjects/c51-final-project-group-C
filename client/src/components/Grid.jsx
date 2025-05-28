// 👇 This is Grid component, for now we use it to display the grid of cards in different tabs ofthe ProfilePage.
// Later on we can also reuse it for SimilarTrips, HomePage, etc.
// It automatically creates a grid layout for the elements passed as children.

const Grid = ({ children, columns = 3 }) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  };

  return <div className={`grid gap-6 ${gridClasses[columns]}`}>{children}</div>;
};

export default Grid;
