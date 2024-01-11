import { Form } from "react-router-dom";

import {
  GigCard,
  CustomInput,
  Button,
  LayoutSection,
  Heading1,
  FormLabel,
  ListBox
} from "../components";
import { usePageData } from "../hooks";

// type TOption = {
//   label: string;
//   value: string;
// };

// const filterGigsOptions = [
//   {
//     label: "Newest",
//     value: "createdAt"
//   },
//   {
//     label: "Best Selling",
//     value: "sales"
//   }
// ] satisfies TOption[];

const filterGigsOptions = ["Newest", "Best Selling"] satisfies string[];

const Gigs = () => {
  const gigs = usePageData({ dataType: "gigs" })?.gigs;

  if (!gigs) {
    return (
      <p className="text-zinc-500 text-lg font-medium text-center mt-10">
        Could not load gigs
      </p>
    );
  }

  let gigsContent: JSX.Element[] | JSX.Element | null = null;

  if (!gigs.length) {
    gigsContent = (
      <p className="text-zinc-500 text-lg font-medium text-center mt-10">
        No gigs found
      </p>
    );
  } else {
    gigsContent = gigs.map((gig) => {
      const {
        _id: gigId,
        coverImage,
        price,
        description,
        category,
        totalStars,
        starNumber,
        userId: userInfo
      } = gig;

      return (
        <GigCard
          key={gigId}
          userInfo={userInfo}
          gigId={gigId}
          totalStars={totalStars}
          starNumber={starNumber}
          coverImage={coverImage}
          price={price}
          description={description}
          category={category}
        />
      );
    });
  }

  return (
    <LayoutSection>
      <Heading1 className="mb-4">AI Artists</Heading1>

      <p>
        Explore the boundaries of art and technology with Fiverr&apos;s AI artists
      </p>

      <Form method="GET" className="flex flex-col items-start py-5 gap-1 mt-6 mb-24">
        <div className="flex flex-col sm:flex-row sm:items-center mb-5 gap-5 max-w-[43.75rem]">
          <div className="w-full flex-1">
            <FormLabel className="mb-2" isRequired={false}>
              Min price
            </FormLabel>
            <CustomInput
              id="min"
              name="min"
              placeholder="Type a min price"
              required={false}
            />
          </div>

          <div className="w-full flex-1">
            <FormLabel className="mb-2" isRequired={false}>
              Max price
            </FormLabel>
            <CustomInput
              id="max"
              name="max"
              placeholder="Type a max price"
              required={false}
            />
          </div>

          <div className="w-full flex-1 self-end">
            <ListBox name="sortBy" options={filterGigsOptions} />
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="sm"
          className="tracking-wide">
          Filter
        </Button>
      </Form>

      <div className="grid grid-cols-min-max-16.25rem-1fr gap-10">{gigsContent}</div>
    </LayoutSection>
  );
};

export default Gigs;
