import { type RouteObject } from "react-router-dom";

import {
  AddGig,
  Error,
  Gig,
  Gigs,
  Home,
  SignIn,
  ChatMessages,
  Chats,
  PrivateGigs,
  Orders,
  SignUp,
  Payment,
  Success,
  Root
} from "../../routes";

import {
  addGigLoader,
  fetchChatsLoader,
  fetchGigsLoader,
  fetchChatMessagesLoader,
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
  createChatAction,
  createGigAction,
  createChatMessageAction,
  deleteGigAction,
  isMessageReadAction,
  signInAction,
  signUpAction
} from "../../routes/actions";

const routerConfig = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
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
        action: createChatAction
      },
      {
        path: "chats",
        element: <Chats />,
        errorElement: <Error />,
        loader: fetchChatsLoader,
        action: isMessageReadAction
      },
      {
        path: "chat-messages/:id",
        element: <ChatMessages />,
        errorElement: <Error />,
        loader: fetchChatMessagesLoader,
        action: createChatMessageAction
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
