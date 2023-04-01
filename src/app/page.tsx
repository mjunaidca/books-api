
import HomeAllBooks from "@/views/Home-AllBooks";

export default function HomePage() {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <HomeAllBooks />
    </div>
  );
}
