export type food = {
    name: string;
    image: string;
    alt: string;
    caloriesPer1g: number;
  };
  
  export const vegetables: food[] = [
    {
      name: "Pomidor",
      image: "/images/tomato.png",
      alt: "zdjecie pomidora",
      caloriesPer1g: 0.20
      ,
    },
    {
      name: "Ogórek",
      image: "/images/cucumber.png",
      alt: "zdjecie ogórka",
      caloriesPer1g: 0.16,
    },
    {
      name: "Papryka",
      image: "/images/pepper.png",
      alt: "zdjecie papryki",
      caloriesPer1g: 0.30,
    },
    {
      name: "Rzodkiewka",
      image: "/images/radish.png",
      alt: "zdjecie rzodkiewki",
      caloriesPer1g: 0.16,
    }
  ];