export interface Fleet {
  name: string;
  badge: string;
  img: string;
  flip?: boolean;
  imageClass?: string;
}

export const FLEETS: Fleet[] = [
  {
    name: "Toyota Avanza",
    badge: "Terjangkau!",
    img: "/images/mobil/avanza.png",
    flip: true,
    imageClass: "scale-110 translate-x-2 -translate-y-1 object-bottom", // Contoh posisi khusus: "scale-110 translate-x-2 -translate-y-1 object-bottom"
  },
  {
    name: "Toyota Innova Reborn",
    badge: "Recommended",
    img: "/images/mobil/innova.png",
    flip: true,
    imageClass: "scale-125 translate-x-2 translate-y-4 object-bottom",
  },
  {
    name: "Daihatsu Xenia",
    badge: "",
    img: "/images/mobil/xenia.webp",
    imageClass: "",
  },
  {
    name: "Hiace Commuter",
    badge: "Terlaris!",
    img: "/images/mobil/hiace-commuter.png",
    imageClass: "",
  },
  {
    name: "Hiace Premio",
    badge: "",
    img: "/images/mobil/hiace-premio.png",
    imageClass: "",
  },
  {
    name: "Hiace Premio Luxury",
    badge: "",
    img: "/images/mobil/hiace-premio-lucury.png",
    imageClass: "",
  },
  {
    name: "Mitsubishi Pajero",
    badge: "",
    img: "/images/mobil/pajero.webp",
    imageClass: "",
  },
  {
    name: "Toyota Fortuner",
    badge: "Premium",
    img: "/images/mobil/fortuner.png",
    imageClass: "",
  },
  {
    name: "Toyota Alphard",
    badge: "Wedding Car",
    img: "/images/mobil/alphard.png",
    imageClass: "",
  },
];
