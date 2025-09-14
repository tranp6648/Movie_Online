"use client";

import React from "react";

export type Actor = {
  id: string;
  name: string;
  photo: string;
};

/** Ảnh dự phòng nếu link gốc hỏng (Unsplash chân dung dọc 500x700) */
const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&auto=format&fit=crop&w=500&h=700";

/** 20 diễn viên hot (ảnh từ Wikimedia) */
export const Actors: Actor[] = [
  {
    id: "actor-leonardo-dicaprio",
    name: "Leonardo DiCaprio",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Leonardo_DiCaprio_2014.jpg/440px-Leonardo_DiCaprio_2014.jpg",
  },
  {
    id: "actor-meryl-streep",
    name: "Meryl Streep",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Meryl_Streep_February_2016.jpg/440px-Meryl_Streep_February_2016.jpg",
  },
  {
    id: "actor-tom-hanks",
    name: "Tom Hanks",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tom_Hanks_TIFF_2019.jpg/440px-Tom_Hanks_TIFF_2019.jpg",
  },
  {
    id: "actor-robert-de-niro",
    name: "Robert De Niro",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Robert_De_Niro_Cannes_2016.jpg/440px-Robert_De_Niro_Cannes_2016.jpg",
  },
  {
    id: "actor-al-pacino",
    name: "Al Pacino",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Al_Pacino_2004.jpg/440px-Al_Pacino_2004.jpg",
  },
  {
    id: "actor-denzel-washington",
    name: "Denzel Washington",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Denzel_Washington_2018.jpg/440px-Denzel_Washington_2018.jpg",
  },
  {
    id: "actor-brad-pitt",
    name: "Brad Pitt",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Brad_Pitt_2019_by_Glenn_Francis.jpg/440px-Brad_Pitt_2019_by_Glenn_Francis.jpg",
  },
  {
    id: "actor-angelina-jolie",
    name: "Angelina Jolie",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Angelina_Jolie_2019.jpg/440px-Angelina_Jolie_2019.jpg",
  },
  {
    id: "actor-johnny-depp",
    name: "Johnny Depp",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Johnny_Depp_2020.jpg/440px-Johnny_Depp_2020.jpg",
  },
  {
    id: "actor-scarlett-johansson",
    name: "Scarlett Johansson",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Scarlett_Johansson_2019_by_Glenn_Francis.jpg/440px-Scarlett_Johansson_2019_by_Glenn_Francis.jpg",
  },
  {
    id: "actor-keanu-reeves",
    name: "Keanu Reeves",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Keanu_Reeves_2019.jpg/440px-Keanu_Reeves_2019.jpg",
  },
  {
    id: "actor-natalie-portman",
    name: "Natalie Portman",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Natalie_Portman_Cannes_2015_2.jpg/440px-Natalie_Portman_Cannes_2015_2.jpg",
  },
  {
    id: "actor-morgan-freeman",
    name: "Morgan Freeman",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Morgan_Freeman_Deauville_2018.jpg/440px-Morgan_Freeman_Deauville_2018.jpg",
  },
  {
    id: "actor-cate-blanchett",
    name: "Cate Blanchett",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Cate_Blanchett_Cannes_2018.jpg/440px-Cate_Blanchett_Cannes_2018.jpg",
  },
  {
    id: "actor-kate-winslet",
    name: "Kate Winslet",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Kate_Winslet_TIFF_2017_2.jpg/440px-Kate_Winslet_TIFF_2017_2.jpg",
  },
  {
    id: "actor-hugh-jackman",
    name: "Hugh Jackman",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hugh_Jackman_2013.jpg/440px-Hugh_Jackman_2013.jpg",
  },
  {
    id: "actor-jackie-chan",
    name: "Jackie Chan",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Jackie_Chan_2012.jpg/440px-Jackie_Chan_2012.jpg",
  },
  {
    id: "actor-julia-roberts",
    name: "Julia Roberts",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Julia_Roberts_May_2016.jpg/440px-Julia_Roberts_May_2016.jpg",
  },
  {
    id: "actor-charlize-theron",
    name: "Charlize Theron",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Charlize_Theron_2019.jpg/440px-Charlize_Theron_2019.jpg",
  },
  {
    id: "actor-keira-knightley",
    name: "Keira Knightley",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Keira_Knightley_2011.jpg/440px-Keira_Knightley_2011.jpg",
  },
];

/** Thẻ hiển thị 1 diễn viên (có fallback ảnh) */
export function ActorCard({ actor }: { actor: Actor }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={actor.photo}
        alt={actor.name}
        className="w-full h-auto rounded-xl object-cover"
        onError={(e) => {
          const img = e.currentTarget;
          // ngăn lặp vô hạn nếu fallback cũng lỗi
          img.onerror = null;
          img.src = FALLBACK_PHOTO;
        }}
      />
      <p className="text-white mt-2 text-center">{actor.name}</p>
    </div>
  );
}
