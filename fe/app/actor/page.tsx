"use client";

import { Actors } from "@/data/Actors";
import ActorListGrid from "@/components/actor/ActorListGrid";

export default function ActorPage() {
  return (
    <main className="min-h-screen bg-[#0F111A] text-white px-4 py-16">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Diễn viên</h1>
        <ActorListGrid items={Actors} />
      </div>
    </main>
  );
}
