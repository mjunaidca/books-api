import React from "react";

export const IconLabelText = ({
  Icon,
  Label,
  Text,
}: {
  Icon: any;
  Label?: string;
  Text: any;
}) => {
  return (
    <div>
      <p className="flex justify-center items-center mr-2 gap-1 text-sm text-gray-600">
        <Icon className="text-yellow-500" />
        {Label} {Text}
      </p>
    </div>
  );
};

export const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-auto flex justify-between flex-col bg-gray-100 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 px-8">
      {children}
    </div>
  );
};
