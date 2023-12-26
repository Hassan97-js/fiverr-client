import { useEffect, useRef } from "react";
import { Form, useNavigation, useOutletContext } from "react-router-dom";

import Review from "./single-review";
import Button from "../button";
import CustomInput from "../form/custom-input";
import SelectInput from "../form/select-input";

import { capitalize } from "../../utils";

import { useUser } from "../../hooks/use-user";

import type { TReview } from "../../types/review.types";

export type AddReviewOption = {
  value: number;
  label: string;
};

const AddReview = () => {
  const { state } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  const isBusy = state === "submitting";

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
    <div>
      <h3 className="mb-4">Add a review</h3>
      <Form ref={formRef} method="POST">
        <CustomInput
          name="description"
          id="add-review"
          placeholder="Write your opinion..."
        />

        <SelectInput name="starNumber" defaultValue="choose" options={options} />

        <Button
          disabled={isBusy}
          type="submit"
          className={`btn btn-primary self-start mt-8 ${
            isBusy ? "bg-green-400" : ""
          }`}>
          {isBusy ? "Adding..." : "Add"}
        </Button>
      </Form>
    </div>
  );
};

type TProps = {
  reviews: TReview[] | null;
  gigUserId: string | null;
};

const Reviews = ({ reviews: reviewsArray, gigUserId }: TProps) => {
  const user = useUser();

  const currentUserId = user?._id;
  const isSeller = user?.isSeller;

  return (
    <div className="reviews">
      <h2 className="mb-6">Reviews</h2>

      {!!reviewsArray?.length ? (
        <div className="items-center flex flex-wrap gap-10 mb-12">
          {reviewsArray.map(({ _id: id, description, userId: userInfo }) => {
            let userName = "";
            let country = "";

            if (typeof userInfo !== "string") {
              userName = userInfo.username;
              country = userInfo.country;
            }

            return (
              <Review
                key={id}
                sellerName={capitalize(userName)}
                sellerImage="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                countryImage="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                countryName={country}
                description={description}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-neutral-500 text-lg font-medium text-left my-10">
          No reviews yet
        </p>
      )}

      {currentUserId !== gigUserId && !isSeller ? <AddReview /> : null}
    </div>
  );
};

export default Reviews;
