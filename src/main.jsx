import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom"; 
import Effect from './components/effect.jsx'; 

import LoginPage from './pages/login/index.jsx';
import RegisterPage from './pages/regiser/index.jsx';
import HomePage from './pages/home/index.jsx';
import SkinTestPage from './pages/skinTest/index.jsx';
import LocationPage from './pages/location/index.jsx';
import AboutPage from './pages/about/index.jsx';
import ContactUs from './pages/contactUs/index.jsx';
import MainLayout from './layout/MainLayout.jsx';
import CategoryPage from './pages/category/index.jsx';
import CleanserPage from './pages/product/cleanser/index.jsx';
import FaceMaskPage from './pages/product/faceMask/index.jsx';
import MoisturizerPage from './pages/product/moisturizer/index.jsx';
import SerumPage from './pages/product/serum/index.jsx';
import SunScreenPage from './pages/product/sunScreen/index.jsx';
import ProductDetail from './pages/product-detail/index.jsx';
import PromotionPage from './pages/promotion/index.jsx';
import FAQsPage from './pages/FAQs/index.jsx';
import PrivacyPolicyPage from './pages/policies/privacy/index.jsx';
import ReturnPolicyPage from './pages/policies/return/index.jsx';
import ShippingPolicyPage from './pages/policies/shipping/index.jsx';
import TermsConditionsPage from './pages/policies/terms-conditions/index.jsx';

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

  //ContactUs Page
  {
    path: "/contact",
    element: <MainLayout />,
    children: [
      {
        path: "/contact",
        element: <ContactUs />,
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

    //Product Detail Page
    {
      path: "/product-detail/:id",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <ProductDetail />,
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Effect /> {/* Thêm Effect Hoa đào rơi */}
    <RouterProvider router={router} /> {/* Router các pages */}
  </StrictMode>,
)
