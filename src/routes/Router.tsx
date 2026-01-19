import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./RootLayout";
import { SvgConverterLoader } from "@/routes/SvgConverterLoader";

// Lazy load features for performance
const SvgConverter = React.lazy(
  () => import("@/features/svg-converter/SvgConverter"),
);
const Optimizer = React.lazy(() => import("@/features/optimizer/Optimizer"));
const Spritesheet = React.lazy(
  () => import("@/features/spritesheet/Spritesheet"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SvgConverterLoader />}>
            <SvgConverter />
          </Suspense>
        ),
      },
      {
        path: "optimizer",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Optimizer />
          </Suspense>
        ),
      },
      {
        path: "spritesheet",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Spritesheet />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
