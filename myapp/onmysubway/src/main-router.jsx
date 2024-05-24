import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '~/routes/landing/page';

const router = createBrowserRouter([
{
path: '/',
element: <LandingPage />,
index: true,
},
]);
export default router;
