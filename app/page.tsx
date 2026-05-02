"use client";

import { useState } from "react";
import Image from "next/image";
import { foods, food } from "./data/foods";

const WEIGHT_OPTIONS = [30, 50, 100];

export default function Home() {
  const [selected, setSelected] = useState<food | null>(null);
  const [weight, setWeight] = useState<number>(100);
  const [customWeight, setCustomWeight] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const activeWeight = isCustom ? (parseFloat(customWeight) || 0) : weight;
  const selectedCalories = selected ? selected.caloriesPer1g * activeWeight : 0;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-4 px-1 sm:px-4 ">
      <h1 className="text-xl font-bold mb-5 text-gray-800 sm:text-4xl sm:mb-10">
        Calorie Calculator
      </h1>

      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-12 w-full px-2">
          {foods.map((food) => {
          const isSelected = selected?.name === food.name;
          return (
            <div
              key={food.name}
              onClick={() => setSelected(isSelected ? null : food)}
              style={{ cursor: "pointer" }}
              className={`flex flex-col items-center rounded-2xl p-2 sm:p-5 transition-all duration-200 border-2 ${
                isSelected
                  ? "border-green-500 bg-green-50 shadow-lg scale-105"
                  : "border-transparent bg-white shadow"
              }`}
            >
              <div className="relative w-12 h-12 sm:w-36 sm:h-36 rounded-xl overflow-hidden pointer-events-none">
                <Image
                  src={food.image}
                  alt={food.alt}
                  fill
                  className="object-cover"
                />
              </div>
             
              <span className="font-stretch-condensed text-xs sm:text-xl sm:font-stretch-expanded  text-gray-400">
                {Math.round(food.caloriesPer1g * 100)} kcal
              </span>
            </div>
          );
        })}
      </div> {}

      {selected && (
        <div className="w-[80vw] bg-white rounded-2xl shadow-md p-6"> 

          <div className="flex items-center gap-2 mb-4 mt-3 ">
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


          <ul className="grid grid-cols-3 sm:grid-cols-4 gap-3 ">
            {foods
              .filter((f: food) => f.name !== selected.name)
              .map((f: food) => {
                const equivalentG = Math.round(selectedCalories / f.caloriesPer1g);
                return (
                  <li
                    key={f.name}
                    className="flex flex-col items-center bg-gray-50 rounded-xl px-5 py-5 gap-2"
                  >
                    <div className="relative w-12 h-12 lg:w-36 lg:h-36 rounded-lg overflow-hidden shrink-0 pointer-events-none">
                      <Image
                        src={f.image}
                        alt={f.alt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <span className="text-green-600 font-semibold lg:text-xl">
                      {equivalentG.toFixed(1)}g
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </main>
  );
}