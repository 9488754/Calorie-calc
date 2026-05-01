export type food = {
    name: string;
    image: string;
    alt: string;
    caloriesPer1g: number;
  };
  
  export const foods: food[] = [
    {
      name: "Apple",
      image: "/images/apple.png",
      alt: "zdjecie jablka",
      caloriesPer1g: 0.53,
    },
    {
      name: "Gruszka",
      image: "/images/pear.png",
      alt: "zdjecie gruszki",
      caloriesPer1g: 0.89,
    },
    {
      name: "Truskawka",
      image: "/images/strawberry.png",
      alt: "zdjecie truskawki",
      caloriesPer1g: 0.32,
    },
    {
      name: "Borowki",
      image: "/images/blueberry.png",
      alt: "zdjecie borowek",
      caloriesPer1g: 0.57,
    },
  ];