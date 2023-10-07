export const TableHead = ({ children }) => {
  return (
    <thead className="text-xs bg-neutral-50 text-neutral-700 uppercase">
      <tr>{children}</tr>
    </thead>
  );
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const Table = ({ children }) => {
  return (
    <div className="relative shadow-md max-w-6xl mx-auto overflow-x-auto select-none">
      <table className="w-full text-sm text-left text-neutral-500">{children}</table>
    </div>
  );
};

export default Table;
