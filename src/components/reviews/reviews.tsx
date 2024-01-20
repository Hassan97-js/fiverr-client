import { useEffect, useRef } from "react";
import { Form, useNavigation } from "react-router-dom";

import Review from "./single-review";
import Button from "../button";
import CustomInput from "../form/custom-input";
import Heading2 from "../typography/heading-2";
import Heading3 from "../typography/heading-3";
import ListBox from "../form/list-box";

import { type TUser } from "../../constants/validators/user-validator";
import { type TReview } from "../../constants/validators/review-validator";

import { useUser } from "../../hooks/use-user";
import { capitalize, cn } from "../../utils";
import FormLabel from "../form/form-label";

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

  const options = ["1", "2", "3", "4", "5"] satisfies string[];

  useEffect(() => {
    if (!isBusy) {
      formRef.current?.reset();
    }
  }, [isBusy]);

  return (
    <div className="max-w-[31.25rem]">
      <Form ref={formRef} method="POST">
        <FormLabel className="mb-2">Add a review</FormLabel>
        <CustomInput className="mb-5" name="description" id="add-review" placeholder="Write your opinion..." />

        <div>
          <FormLabel className="mb-2">Choose a rating</FormLabel>
          <ListBox name="rating" options={options} />
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
      <Heading2 className="mb-3">Reviews</Heading2>

      <div className="mb-20">
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
          <p className="text-zinc-500 text-lg font-medium text-left">No reviews yet</p>
        )}
      </div>

      {currentUserId !== gigUserId && !isSeller ? <AddReview /> : null}
    </div>
  );
};

export default Reviews;
