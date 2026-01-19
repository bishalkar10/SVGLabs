import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy load features for performance
const SvgConverter = React.lazy(() => import('@/features/svg-converter/SvgConverter'));
const Optimizer = React.lazy(() => import('@/features/optimizer/Optimizer'));
const Spritesheet = React.lazy(() => import('@/features/spritesheet/Spritesheet'));

import { Loader } from '@/routes/Loader';

const LoadingFallback = () => <Loader />;

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<SvgConverter />} />
        <Route path="/optimizer" element={<Optimizer />} />
        <Route path="/spritesheet" element={<Spritesheet />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
