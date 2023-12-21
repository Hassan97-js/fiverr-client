import { type RouteObject } from "react-router-dom";

import {
  AddGig,
  Error,
  Gig,
  Gigs,
  Home,
  SignIn,
  Message,
  Messages,
  MyGigs,
  Orders,
  SignUp,
  Payment,
  Success,
  Root
} from "../../routes";

import {
  addGigLoader,
  fetchConversationsLoader,
  fetchGigsLoader,
  fetchMessagesLoader,
  fetchMyGigsLoader,
  fetchOrdersLoader,
  fetchSingleGigLoader,
  paymentLoader,
  rootLoader,
  signInLoader,
  successLoader
} from "../../routes/loaders";

import {
  addReviewAction,
  createConversationAction,
  createGigAction,
  createMessageAction,
  deleteGigAction,
  isMessageReadAction,
  signInAction,
  signUpAction
} from "../../routes/actions";

const routerConfig = [
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />
      },
      {
        path: "sign-in",
        element: <SignIn />,
        errorElement: <Error />,
        loader: signInLoader,
        action: signInAction
      },
      {
        path: "sign-up",
        element: <SignUp />,
        errorElement: <Error />,
        action: signUpAction
      },
      {
        path: "gigs",
        element: <Gigs />,
        errorElement: <Error />,
        loader: fetchGigsLoader
      },
      {
        path: "gig/:id",
        element: <Gig />,
        errorElement: <Error />,
        loader: fetchSingleGigLoader,
        action: addReviewAction
      },
      {
        path: "my-gigs",
        element: <MyGigs />,
        errorElement: <Error />,
        loader: fetchMyGigsLoader,
        action: deleteGigAction
      },
      {
        path: "orders",
        element: <Orders />,
        errorElement: <Error />,
        loader: fetchOrdersLoader,
        action: createConversationAction
      },
      {
        path: "messages",
        element: <Messages />,
        errorElement: <Error />,
        loader: fetchConversationsLoader,
        action: isMessageReadAction
      },
      {
        path: "message/:id",
        element: <Message />,
        errorElement: <Error />,
        loader: fetchMessagesLoader,
        action: createMessageAction
      },
      {
        path: "add",
        element: <AddGig />,
        errorElement: <Error />,
        loader: addGigLoader,
        action: createGigAction
      },
      {
        path: "payment/:gigId",
        element: <Payment />,
        errorElement: <Error />,
        loader: paymentLoader
      },
      {
        path: "success",
        element: <Success />,
        errorElement: <Error />,
        loader: successLoader
      }
    ]
  }
] satisfies RouteObject[];

export default routerConfig;
