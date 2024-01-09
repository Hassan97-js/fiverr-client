import { TableHTMLAttributes, type ReactNode } from "react";

type TTableHeadProps = {
  children: ReactNode;
};

type TTableBodyProps = {
  children: ReactNode;
};

type TTableProps = TableHTMLAttributes<HTMLTableElement> & {
  children: ReactNode;
  isLoading?: boolean;
};

export const TableHead = ({ children }: TTableHeadProps) => {
  return (
    <thead className="text-xs bg-zinc-50 text-zinc-700 uppercase">
      <tr>{children}</tr>
    </thead>
  );
};

export const TableBody = ({ children }: TTableBodyProps) => {
  return <tbody>{children}</tbody>;
};

const Table = ({ children, style, isLoading = false }: TTableProps) => {
  return (
    <div
      style={{ opacity: isLoading ? "0.5" : "1", ...style }}
      className="relative shadow-md max-w-6xl mx-auto overflow-x-auto select-none">
      <table className="w-full text-sm text-left text-zinc-500">{children}</table>
    </div>
  );
};

export default Table;
