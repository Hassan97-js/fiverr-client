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
  fetchGigsFromDB,
  fetchOrdersFromDB,
  fetchSingleGigFromDB,
  fetchConversationsFromDB,
  fetchMyGigsFromDB,
  fetchMessagesFromDB,
  fetchCurrentUserFromDB,
  paymentLoader,
  signinAction,
  signupAction,
  addReviewAction,
  isMessageReadAction,
  createMessageAction,
  createConversationAction,
  successLoader,
  deleteGigAction,
  createGigAction
} from "../../routes";

const routerConfig = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: fetchCurrentUserFromDB,
    children: [
      {
        index: true,
        // element: <Home />,
        element: <h1>Home</h1>,
        errorElement: <Error />
      },
      // {
      //   path: "signup",
      //   element: <Signup />,
      //   errorElement: <Error />,
      //   action: signupAction
      // },
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
      {
        path: "sign-in",
        element: <Signin />,
        errorElement: <Error />,
        action: signinAction
      }
      // {
      //   path: "gigs",
      //   element: <Gigs />,
      //   errorElement: <Error />,
      //   loader: fetchGigsFromDB
      // },
      // {
      //   path: "mygigs",
      //   element: <MyGigs />,
      //   errorElement: <Error />,
      //   loader: fetchMyGigsFromDB,
      //   action: deleteGigAction
      // },
      // {
      //   path: "add",
      //   element: <AddGig />,
      //   errorElement: <Error />,
      //   action: createGigAction
      // },
      // {
      //   path: "orders",
      //   element: <Orders />,
      //   errorElement: <Error />,
      //   loader: fetchOrdersFromDB,
      //   action: createConversationAction
      // },
      // {
      //   path: "messages",
      //   element: <Messages />,
      //   errorElement: <Error />,
      //   loader: fetchConversationsFromDB,
      //   action: isMessageReadAction
      // },
      // {
      //   path: "message/:id",
      //   element: <Message />,
      //   errorElement: <Error />,
      //   loader: fetchMessagesFromDB,
      //   action: createMessageAction
      // },
      // {
      //   path: "gig/:id",
      //   element: <Gig />,
      //   errorElement: <Error />,
      //   loader: fetchSingleGigFromDB,
      //   action: addReviewAction
      // }
    ]
  }
];

export default routerConfig;
