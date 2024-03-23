import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense
      fallback={
        <div className="text-center w-full mt-20 text-2xl font-bold">
          Translating Paper...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
