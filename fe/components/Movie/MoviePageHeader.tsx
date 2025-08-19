"use client";

type Props = {
  title: string;
};

export default function MoviePageHeader({ title }: Props) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        {title}
      </h1>
      <div className="h-[2px] w-16 bg-red-500 mt-2 rounded"></div>
    </header>
  );
}
