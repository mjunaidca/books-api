import Link from "next/link";

export const BlueButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <div>
      <button className="bg-blue-500 w-full rounded-b-sm text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        <Link href={href}>{text}</Link>
      </button>{" "}
    </div>
  );
};
