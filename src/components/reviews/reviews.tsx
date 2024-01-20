import { useEffect, useRef } from "react";
import { Form, useNavigation } from "react-router-dom";

import Review from "./single-review";
import Button from "../button";
import CustomInput from "../form/custom-input";
import SelectInput from "../form/select-input";
import Heading2 from "../typography/heading-2";
import Heading3 from "../typography/heading-3";

import { type TUser } from "../../constants/validators/user-validator";
import { type TReview } from "../../constants/validators/review-validator";

import { useUser } from "../../hooks/use-user";
import { capitalize, cn } from "../../utils";

export type AddReviewOption = {
  value: number;
  label: string;
};

type TReviewsProps = {
  reviews: TReview[];
  gigUserId: string | null;
};

const AddReview = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();

  const isBusy = navigation.state === "submitting";

  const options = [
    { value: 0, label: "Choose a number" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" }
  ] satisfies AddReviewOption[];

  useEffect(() => {
    if (!isBusy) {
      formRef.current?.reset();
    }
  }, [isBusy]);

  return (
    <div className="max-w-[31.25rem]">
      <Heading3 className="mb-4">Add a review</Heading3>
      <Form ref={formRef} method="POST">
        <CustomInput name="description" id="add-review" placeholder="Write your opinion..." />

        <div className="mt-2">
          <SelectInput name="rating" defaultValue="choose" options={options} />
        </div>

        <Button
          disabled={isBusy}
          type="submit"
          variant="primary"
          className={cn("self-start mt-8", {
            "bg-green-400": isBusy
          })}>
          {isBusy ? "Adding..." : "Add"}
        </Button>
      </Form>
    </div>
  );
};

const Reviews = ({ reviews: reviewsArray, gigUserId }: TReviewsProps) => {
  const user = useUser();

  const currentUserId = user?._id;
  const isSeller = user?.isSeller;

  return (
    <div className="reviews">
      <Heading2 className="mb-6">Reviews</Heading2>

      {!!reviewsArray?.length ? (
        <div className="items-center flex flex-wrap gap-10 mb-12">
          {reviewsArray.map(({ _id: id, description, userId: currentUserInfo, rating }) => {
            let reviewUser: TUser | null = null;

            if (typeof currentUserInfo !== "string") {
              reviewUser = currentUserInfo;
            }

            return (
              <Review
                key={id}
                sellerName={capitalize(user?.username ?? "Unknown")}
                sellerImage={reviewUser?.image}
                countryName={reviewUser?.country}
                description={description}
                rating={rating}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-zinc-500 text-lg font-medium text-left my-10">No reviews yet</p>
      )}

      {currentUserId !== gigUserId && !isSeller ? <AddReview /> : null}
    </div>
  );
};

export default Reviews;
