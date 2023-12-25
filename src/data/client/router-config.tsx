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
  PrivateGigs,
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
  fetchPrivateGigsLoader,
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
  signOutAction,
  signUpAction
} from "../../routes/actions";

const routerConfig = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
    action: signOutAction,
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
        path: "private-gigs",
        element: <PrivateGigs />,
        errorElement: <Error />,
        loader: fetchPrivateGigsLoader,
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
