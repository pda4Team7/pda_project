import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '~/routes/main/page';
import LandingPage from '~/routes/landing/page';
import LoginPage from '~/routes/login/page';
import SignUpPage from '~/routes/signup/page';


const router = createBrowserRouter([
{
    path: '/',
    element: <LandingPage />,
},
{
    path: '/main',
    element: <MainPage />,
    },
{
    path: '/login',
    element: <LoginPage />,
    },
{
    path: '/signup',
    element: <SignUpPage />,
    },
]);
export default router;
