import Link from "next/link";
import React from "react";

export const RingButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <div>
      <Link
        href={href}
        className="px-6 py-2 bg-blue-200 ring-2 ring-blue-700 font-semibold rounded-lg hover:bg-blue-300 transition-colors duration-200"
      >
        {text}
      </Link>
    </div>
  );
};
