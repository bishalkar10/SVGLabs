import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy load features for performance
const SvgConverter = React.lazy(
  () => import("@/features/svg-converter/SvgConverter"),
);
const Optimizer = React.lazy(() => import("@/features/optimizer/Optimizer"));
const Spritesheet = React.lazy(
  () => import("@/features/spritesheet/Spritesheet"),
);

import { SvgConverterLoader } from "@/routes/SvgConverterLoader";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<SvgConverterLoader />}>
            <SvgConverter />
          </Suspense>
        }
      />
      <Route path="/optimizer" element={<Optimizer />} />
      <Route path="/spritesheet" element={<Spritesheet />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
