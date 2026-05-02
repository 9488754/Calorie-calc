"use client";

import { useState } from "react";
import Image from "next/image";
import { foods, food } from "./data/foods";
import { vegetables } from "./data/vegetables";


const WEIGHT_OPTIONS = [30, 50, 100];

export default function Home() {
  const [selected, setSelected] = useState<food | null>(null);
  const [weight, setWeight] = useState<number>(100);
  const [customWeight, setCustomWeight] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  type Easing = "linear" | "ease-out" | "ease-in-out" | "ease-in";
  const [easing, setEasing] = useState<Easing>("ease-in");
  const [isFruits, setIsFruits] = useState(true);
  const easings: Easing[] = ["linear", "ease-out", "ease-in-out", "ease-in"];
  const activeWeight = isCustom ? (parseFloat(customWeight) || 0) : weight;
  const selectedCalories = selected ? selected.caloriesPer1g * activeWeight : 0;
  const items = isFruits ? foods : vegetables;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center mt-2 px-1 sm:px-4 ">
      <div className="flex flex-row items-center gap-4 mb-2">
  <span className={`text-xl sm:text-2xl font-bold transition-all duration-200 ${isFruits ? "text-gray-800" : "text-gray-300"}`}>
    Fruits
  </span>

  <button
    onClick={() => { setIsFruits(!isFruits); setSelected(null); }}
    className="relative flex-shrink-0 w-14 h-7 bg-gray-200 rounded-full transition-all duration-200"
  >
    <span
      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
      style={{ left: isFruits ? "4px" : "calc(100% - 24px)" }}
    />
  </button>

  <span className={`text-xl sm:text-2xl font-bold transition-all duration-200 ${!isFruits ? "text-gray-800" : "text-gray-300"}`}>
    Vegetables
  </span>
</div>
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-4 w-full px-2">
          {items.map((food) => {
          const isSelected = selected?.name === food.name;
          const isUnselected = selected !== null && !isSelected;
          return (
            <div
              key={food.name}
              onClick={() => setSelected(isSelected ? null : food)}
              style={{
                cursor: "pointer",
                transform: isSelected ? "scale(1.05)" : isUnselected ? "scale(0.75)" : "scale(1)",
                transition: `all 200ms ${easing}`,
                opacity: isUnselected ? 0.5 : 1,
              }}
              className={`flex flex-col items-center rounded-2xl p-2 sm:p-5 border-2 ${
                isSelected
                  ? "border-green-500 bg-green-50 shadow-lg"
                  : "border-transparent bg-white shadow"
              }`}
            >
              <div className="relative w-12 h-12 sm:w-36 sm:h-36 rounded-xl overflow-hidden pointer-events-none">
                <Image
                  src={food.image}
                  alt={food.alt}
                  fill
                  className="object-contain"
                />
              </div>
             
              <span className="font-stretch-condensed text-xs sm:text-xl sm:font-stretch-expanded  text-gray-400">
                {Math.round(food.caloriesPer1g * 100)} kcal
              </span>
            </div>
          );
        })}
      </div> {} 

          <div className={selected ? "block w-full" : "hidden"}>
      <div className="w-full bg-white rounded-2xl shadow-md p-6">
        <div className="hidden">
          {items.map((f) => (
            <Image key={f.name} src={f.image} alt="" fill={false} width={1} height={1} />
          ))}
        </div>

        <ul className="grid grid-cols-5 sm:grid-cols-5 gap-3 w-full">
          {items
            .filter((f: food) => f.name !== selected?.name)
            .map((f: food) => {
              const equivalentG = Math.round(selectedCalories / f.caloriesPer1g);
              return (
                <li
                  key={f.name}
                  className="flex flex-col items-center bg-gray-50 rounded-xl px-3 w-full gap-2"
                >
                  <div className="relative w-16 h-16 lg:w-36 lg:h-36 rounded-lg overflow-hidden shrink-0 pointer-events-none">
                    <Image
                      src={f.image}
                      alt={f.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-green-700 font-semibold lg:text-xl">
                    {equivalentG}g
                  </span>
                </li>
              );
            })}
        </ul>

        <div className="flex items-center gap-2 mb-4 mt-3">
          <label className="text-sm text-gray-500">Weight:</label>
          <select
            value={isCustom ? "custom" : weight}
            onChange={(e) => {
              if (e.target.value === "custom") {
                setIsCustom(true);
              } else {
                setIsCustom(false);
                setWeight(Number(e.target.value));
              }
            }}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white"
          >
            {WEIGHT_OPTIONS.map((w) => (
              <option key={w} value={w}>{w}g</option>
            ))}
            <option value="custom">Custom</option>
          </select>

          {isCustom && (
            <input
              type="number"
              min="0"
              placeholder="e.g. 250"
              value={customWeight}
              onChange={(e) => setCustomWeight(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-24 text-gray-700"
            />
          )}
          <span className="text-sm text-gray-400">
            = {selectedCalories.toFixed(1)} kcal
          </span>
        </div>
      </div>
    </div>
    </main>
  );
}