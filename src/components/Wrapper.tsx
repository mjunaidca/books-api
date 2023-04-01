import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex px-8 min-h-screen h-full container max-w-full w-full items-center justify-center">
      {children}
    </div>
  );
};

export default Wrapper;
