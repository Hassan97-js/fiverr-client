import { Form } from "react-router-dom";

import {
  GigCard,
  CustomInput,
  Button,
  LayoutSection,
  Heading1,
  FormLabel
} from "../components";
import { usePageData } from "../hooks";

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

      <Form method="GET" className="flex flex-col items-start py-5 gap-5 mt-6 mb-24">
        <div className="flex flex-col items-start mb-5 gap-5">
          <div>
            <FormLabel className="mb-2" isRequired={false}>
              Min price
            </FormLabel>
            <CustomInput id="min" name="min" placeholder="min" required={false} />
          </div>

          <div>
            <FormLabel className="mb-2" isRequired={false}>
              Max price
            </FormLabel>
            <CustomInput id="max" name="max" placeholder="max" required={false} />
          </div>
        </div>

        <div className="flex flex-col w-96">
          <span className="font-medium -mb-2 text-zinc-600">Sort by</span>
          <select
            name="sortBy"
            defaultValue="createdAt"
            className="bg-white border border-zinc-300 outline-0 radius-base p-3 my-4 w-52 cursor-pointer rounded-sm">
            <option value="createdAt">Newest</option>
            <option value="sales">Best Selling</option>
          </select>
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="sm"
          className="tracking-wide">
          Apply
        </Button>
      </Form>

      <div className="grid grid-cols-min-max-16.25rem-1fr gap-10">{gigsContent}</div>
    </LayoutSection>
  );
};

export default Gigs;
