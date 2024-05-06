"use client"

import { useState, useEffect } from 'react';
import { categoryFilters } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategory(category);
  }, [searchParams]);

  const handleTags = (item: string) => {
    setSelectedCategory(item);
    router.push(`${pathName}?category=${item}`);
  };

  return (
    <div className="flexBetween  w-full gap-5 flex-wrap bg-light-white-100 rounded-lg">
      <ul className="flex gap-2 overflow-auto item-center">
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              selectedCategory === filter
                ? "bg-light-white-400 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

