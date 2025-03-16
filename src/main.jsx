import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Effect from "./components/effect.jsx";
import { ToastContainer } from "react-toastify";

import MainLayout from "./layout/MainLayout.jsx";
import LoginPage from "./pages/login/index.jsx";
import ProfilePage from "./pages/profile/index.jsx";
import RegisterPage from "./pages/register/index.jsx";
import HomePage from "./pages/home/index.jsx";
import SkinTestPage from "./pages/skinTest/index.jsx";
import LocationPage from "./pages/location/index.jsx";
import AboutPage from "./pages/about/index.jsx";
import BlogPage from "./pages/blog/index.jsx";
import CleanserPage from "./pages/product/cleanser/index.jsx";
import FaceMaskPage from "./pages/product/faceMask/index.jsx";
import MoisturizerPage from "./pages/product/moisturizer/index.jsx";
import SerumPage from "./pages/product/serum/index.jsx";
import SunScreenPage from "./pages/product/sunScreen/index.jsx";
import CategoryPage from "./pages/category/index.jsx";
import ProductDetailPage from "./pages/product-detail/index.jsx";
import ProductSearchPage from "./pages/product-search/index.jsx";
import PromotionPage from "./pages/promotion/index.jsx";
import FAQsPage from "./pages/FAQs/index.jsx";
import PrivacyPolicyPage from "./pages/policies/privacy/index.jsx";
import ReturnPolicyPage from "./pages/policies/return/index.jsx";
import ShippingPolicyPage from "./pages/policies/shipping/index.jsx";
import TermsConditionsPage from "./pages/policies/terms-conditions/index.jsx";
import Dashboard from "./pages/dashboard/dashboardTemplate/index.jsx";
import ProductPage from "./pages/dashboard/product/index.jsx";
import StaffPage from "./pages/dashboard/staff/index.jsx";
import OrderPage from "./pages/dashboard/order/index.jsx";
import CustomerPage from "./pages/dashboard/customer/index.jsx";
import ProductComparePage from "./pages/product-compare/index.jsx";

//Single Page Application
//Client side rendering
//document.getElementById('root'): Tìm 1 cái thẻ có Id là "root" -> Lấy code ở trong App gắn vào root

const router = createBrowserRouter([
  //Home Page (Default)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },

  //Login Page
  {
    path: "/login",
    element: <MainLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  //Register Page
  {
    path: "/register",
    element: <MainLayout />,
    children: [
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  //Profile Page
  {
    path: "/profile",
    element: <MainLayout />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },

  //Skin Test Page
  {
    path: "/skin-test",
    element: <SkinTestPage />,
  },

  //Location Page
  {
    path: "/location",
    element: <MainLayout />,
    children: [
      {
        path: "/location",
        element: <LocationPage />,
      },
    ],
  },

  //Category Page
  {
    path: "/category",
    element: <MainLayout />,
    children: [
      {
        path: "/category",
        element: <CategoryPage />,
      },
    ],
  },

  //Product Detail Page
  {
    path: "/product-detail/:id",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <ProductDetailPage />,
      },
    ],
  },

  //Product Search Page
  {
    path: "/product-search",
    element: <MainLayout />,
    children: [
      {
        path: "/product-search",
        element: <ProductSearchPage />,
      },
    ],
  },

  //Product Compare Page
  {
    path: "/product-compare",
    element: <MainLayout />,
    children: [
      {
        path: "/product-compare",
        element: <ProductComparePage />,
      },
    ],
  },

  //About Page
  {
    path: "/about",
    element: <MainLayout />,
    children: [
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },

  //Blog Page
  {
    path: "/blog",
    element: <MainLayout />,
    children: [
      {
        path: "/blog",
        element: <BlogPage />,
      },
    ],
  },

  //cleanser Page
  {
    path: "/cleanser",
    element: <MainLayout />,
    children: [
      {
        path: "/cleanser",
        element: <CleanserPage />,
      },
    ],
  },

  //face-mask Page
  {
    path: "/face-mask",
    element: <MainLayout />,
    children: [
      {
        path: "/face-mask",
        element: <FaceMaskPage />,
      },
    ],
  },

  //moisturizer Page
  {
    path: "/moisturizer",
    element: <MainLayout />,
    children: [
      {
        path: "/moisturizer",
        element: <MoisturizerPage />,
      },
    ],
  },

  //serum Page
  {
    path: "/serum",
    element: <MainLayout />,
    children: [
      {
        path: "/serum",
        element: <SerumPage />,
      },
    ],
  },

  //sunscreen Page
  {
    path: "/sunscreen",
    element: <MainLayout />,
    children: [
      {
        path: "/sunscreen",
        element: <SunScreenPage />,
      },
    ],
  },

  //FAQs Page
  {
    path: "/faqs",
    element: <MainLayout />,
    children: [
      {
        path: "/faqs",
        element: <FAQsPage />,
      },
    ],
  },

  //Privacy Policy Page
  {
    path: "/privacy-policy",
    element: <MainLayout />,
    children: [
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
    ],
  },

  //Return Policy Page
  {
    path: "/return-policy",
    element: <MainLayout />,
    children: [
      {
        path: "/return-policy",
        element: <ReturnPolicyPage />,
      },
    ],
  },

  //Shipping Policy Page
  {
    path: "/shipping-policy",
    element: <MainLayout />,
    children: [
      {
        path: "/shipping-policy",
        element: <ShippingPolicyPage />,
      },
    ],
  },

  //Terms & Conditions Page
  {
    path: "/terms-conditions",
    element: <MainLayout />,
    children: [
      {
        path: "/terms-conditions",
        element: <TermsConditionsPage />,
      },
    ],
  },

  //Promotion Page
  {
    path: "/promotion",
    element: <MainLayout />,
    children: [
      {
        path: "/promotion",
        element: <PromotionPage />,
      },
    ],
  },

  //Dashboard Page
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/product",
        element: <ProductPage />,
      },
    ],
  },

  //Mangage Staff
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/staff",
        element: <StaffPage />,
      },
    ],
  },

  //Manage order
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/order",
        element: <OrderPage />,
      },
    ],
  },

  //Manage customer
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/customer",
        element: <CustomerPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Effect /> {/* Thêm Effect Hoa đào rơi */}
    <RouterProvider router={router} /> {/* Router các pages */}
    <ToastContainer />
  </StrictMode>
);
