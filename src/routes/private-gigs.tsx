import { Link } from "react-router-dom";

import { Button, LayoutSection, PrivateGigsTable } from "../components";
import { usePageData } from "../hooks";

export type TTableHeader = {
  id: number;
  text: string;
};

const PrivateGigs = () => {
  const gigs = usePageData({ dataType: "privateGigs" })?.privateGigs;

  if (!gigs) {
    return (
      <p className="text-zinc-500 text-lg font-medium text-center mt-10">
        Could not load gigs
      </p>
    );
  }

  if (!gigs?.length) {
    return (
      <p className="text-zinc-500 text-lg font-medium text-center mt-10">
        No gigs found
      </p>
    );
  }

  const tableHeaders = [
    { id: 1, text: "Image" },
    { id: 2, text: "Title" },
    { id: 3, text: "Price" },
    { id: 4, text: "Sales" },
    { id: 5, text: "Delete" }
  ] satisfies TTableHeader[];

  return (
    <LayoutSection>
      <div className="flex items-center justify-end mb-10 max-w-6xl mx-auto">
        <Link to="/add">
          <Button variant="primary" size="sm">
            Add new gig
          </Button>
        </Link>
      </div>

      <PrivateGigsTable tableHeaders={tableHeaders} tableData={gigs} />
    </LayoutSection>
  );
};

export default PrivateGigs;
