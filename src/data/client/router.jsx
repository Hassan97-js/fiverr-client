import {
  AddGig,
  Error,
  Gig,
  Gigs,
  Home,
  Signin,
  Message,
  Messages,
  MyGigs,
  Orders,
  Signup,
  Payment,
  Success,
  Root,
  fetchGigsLoader,
  fetchOrdersLoader,
  fetchSingleGigLoader,
  fetchConversationsLoader,
  fetchMyGigsLoader,
  fetchMessagesLoader,
  paymentLoader,
  signInAction,
  signUpAction,
  addReviewAction,
  isMessageReadAction,
  createMessageAction,
  createConversationAction,
  successLoader,
  deleteGigAction,
  createGigAction,
  rootLoader
} from "../../routes";

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
        element: <Signin />,
        errorElement: <Error />,
        action: signInAction
      },
      {
        path: "sign-up",
        element: <Signup />,
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
      // {
      //   path: "payment/:gigId",
      //   element: <Payment />,
      //   errorElement: <Error />,
      //   loader: paymentLoader
      // },
      // {
      //   path: "success",
      //   element: <Success />,
      //   errorElement: <Error />,
      //   loader: successLoader
      // },
      // {
      //   path: "add",
      //   element: <AddGig />,
      //   errorElement: <Error />,
      //   action: createGigAction
      // },
      // {
    ]
  }
];

export default routerConfig;
