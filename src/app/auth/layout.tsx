import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[78vh] flex items-center justify-center ">
      {children}
    </div>
  );
}

export default AuthLayout;
