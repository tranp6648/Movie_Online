"use client";

import { Actor, ActorCard } from "@/data/Actors";

type Props = {
  items: Actor[];
};

export default function ActorListGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {items.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </div>
  );
}
