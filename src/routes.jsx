// src/routes.js
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import React from "react";
// Lazy-loaded components
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Category = lazy(() => import("./Pages/Category"));
const CategoryForm = lazy(() => import("./Pages/CategoryForm"));
const SubscriptionPlan = lazy(() => import("./Pages/SubscriptionPlan"));
const Vendors = lazy(() => import("./Pages/Vendors"));
const VendorView = lazy(() => import("./Pages/Vendors/VendorView"));
const VendorEdit = lazy(() => import("./Pages/Vendors/VendorEdit"));
const EInvites = lazy(() => import("./Pages/EInvites"));
const WeddingCard = lazy(() => import("./Pages/EInvites/WeddingCard"));
const VideoInvites = lazy(() => import("./Pages/EInvites/VideoInvites"));
const VideoRequest = lazy(() => import("./Pages/EInvites/VideoRequest"));
const TopSelling = lazy(() => import("./Pages/TopSelling"));
const TopTrading = lazy(() => import("./Pages/TopTrading"));
const AboutApp = lazy(() => import("./Pages/AboutApp"));
const Story = lazy(() => import("./Pages/AboutApp/Story"));
const IntroScreen = lazy(() => import("./Pages/AboutApp/IntroScreen"));
const Carousel = lazy(() => import("./Pages/AboutApp/Carousel"));
const Rating = lazy(() => import("./Pages/AboutApp/Rating"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const PrivacyPolicyEditor = lazy(
  () => import("./Component/Common/PrivacyPolicyEditor"),
);
const NavBar = lazy(() => import("./Component/NavBar"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "categories", element: <Category /> },
      { path: "categoryForm", element: <CategoryForm /> },
      { path: "subscriptionPlan", element: <SubscriptionPlan /> },
      { path: "terms", element: <PrivacyPolicyEditor /> },
      { path: "condition", element: <PrivacyPolicyEditor /> },
      { path: "vendors", element: <Vendors /> },
      { path: "viewVendor", element: <VendorView /> },
      { path: "vendorEdit", element: <VendorEdit /> },
      { path: "eInvite", element: <EInvites /> },
      { path: "weddingCards", element: <WeddingCard /> },
      { path: "videoInvites", element: <VideoInvites /> },
      { path: "videoRequests", element: <VideoRequest /> },
      { path: "topTrending", element: <TopTrading /> },
      { path: "topSelling", element: <TopSelling /> },
      { path: "aboutApp", element: <AboutApp /> },
      { path: "story", element: <Story /> },
      { path: "introScreen", element: <IntroScreen /> },
      { path: "carousel", element: <Carousel /> },
      { path: "rating", element: <Rating /> },
      { path: "contactUs", element: <ContactUs /> },
      { path: "*", element: <div>Page Not Found</div> },
    ],
  },
]);
