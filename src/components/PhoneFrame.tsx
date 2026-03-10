'use client';

import { ReactNode } from 'react';

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#04040a' }}>
      <div className="phone-frame">
        <div className="phone-inner">
          {children}
        </div>
      </div>
    </div>
  );
}
