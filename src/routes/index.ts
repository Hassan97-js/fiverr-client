import Root from "./root";
import Error from "./error";
import AddGig from "./add-gig";
import Gig from "./gig/gig";
import Gigs from "./gigs/gigs";
import Home from "./home";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import Message from "./message";
import Messages from "./messages";
import MyGigs from "./my-gigs";
import Orders from "./orders";
import Payment from "./payment";
import Success from "./success";

import {
  fetchGigsLoader,
  fetchSingleGigLoader,
  fetchOrdersLoader,
  fetchConversationsLoader,
  fetchMessagesLoader,
  paymentLoader,
  successLoader,
  fetchMyGigsLoader,
  signInLoader,
  addGigLoader
} from "./loaders";

import {
  signInAction,
  signUpAction,
  addReviewAction,
  isMessageReadAction,
  createMessageAction,
  createConversationAction,
  deleteGigAction,
  createGigAction
} from "./actions";

export {
  Root,
  Error,
  AddGig,
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
  signInLoader,
  fetchGigsLoader,
  fetchOrdersLoader,
  fetchSingleGigLoader,
  fetchConversationsLoader,
  fetchMessagesLoader,
  fetchMyGigsLoader,
  paymentLoader,
  successLoader,
  addGigLoader,
  deleteGigAction,
  signInAction,
  signUpAction,
  addReviewAction,
  isMessageReadAction,
  createMessageAction,
  createConversationAction,
  createGigAction
};
