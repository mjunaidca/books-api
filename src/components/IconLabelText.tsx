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

