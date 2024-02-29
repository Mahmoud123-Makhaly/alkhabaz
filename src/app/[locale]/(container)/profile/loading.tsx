'use client';

import React from 'react';
import { Loader } from '@components';

const loading = () => {
  return (
    <div className="loader-wrapper">
      <Loader style="dots" />
    </div>
  );
};

export default loading;
