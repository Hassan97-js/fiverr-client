import { useEffect, useRef } from "react";
import { Form, useNavigation } from "react-router-dom";

import Review from "./single-review";

import Button from "../custom-button/button";
import CustomInput from "../form/custom-input";
import SelectInput from "../form/select-input";

import { useCurrentUserContext } from "../../context";
import { capitalize } from "../../utils";

const AddReview = () => {
  const { state } = useNavigation();
  const formRef = useRef(null);

  const isBusy = state === "submitting";

  const options = [
    { value: 0, label: "Choose a number" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" }
  ];

  useEffect(() => {
    if (!isBusy) {
      formRef.current?.reset();
    }
  }, [isBusy]);

  return (
    <div className="add-review">
      <h3 className="mb-4">Add a review</h3>
      <Form ref={formRef} method="post">
        <CustomInput
          inputName="description"
          inputId="add-review"
          placeholderText="Write your opinion..."
        />
        <SelectInput
          selectInputName="starNumber"
          defaultValue="choose"
          options={options}
        />

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

const Reviews = ({ reviews: reviewsArray, gigUserId }) => {
  const { currentUser } = useCurrentUserContext();

  const currentUserId = currentUser?.id;

  return (
    <div className="reviews">
      <h2 className="mb-6">Reviews</h2>

      {reviewsArray.length ? (
        <div className="items-center flex flex-wrap gap-10 mb-12">
          {reviewsArray.map(({ _id: id, description, userId: userInfo }) => {
            const { username, country } = userInfo;

            return (
              <Review
                key={id}
                sellerName={capitalize(username)}
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

      {currentUserId !== gigUserId ? <AddReview /> : null}
    </div>
  );
};

export default Reviews;
