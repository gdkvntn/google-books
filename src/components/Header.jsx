import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks, infoSearch } from "../store/slice";

const categories = [
  "All",
  "Art",
  "Biography",
  "Computers",
  "History",
  "Medical",
  "Poetry",
];

const sort = ["relevance", "newest"];

export default function Header() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sorted, setSorted] = useState("relevance");

  const searchLaunch = () => {
    dispatch(
      infoSearch({
        text: search,
        category: selectedCategory,
        sort: sorted,
      })
    );
    dispatch(fetchBooks());
  };

  return (
    <header className="bg-header-img bg-cover ">
      <div className="bg-black/40  text-slate-600  flex align-center flex-col items-center px-4 py-12">
        <h1 className="text-gray-100  text-4xl font-bold ">Search for books</h1>
        <div className="mt-5 flex flex-col gap-4 max-w-sm w-full sm:flex-row">
          <input
            type="text"
            aria-label="Search"
            className=" bg-gray-100 p-2 rounded  w-full"
            value={search}
            onKeyDown={(e) => (e.key === "Enter" ? searchLaunch() : null)}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-gray-100 p-2 rounded"
            onClick={() => searchLaunch()}
          >
            Search
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 mt-6 sm:flex-row">
          <label
            htmlFor="categories-select"
            className="text-gray-100 font-bold"
          >
            Categories
          </label>
          <select
            id="categories-select"
            className=" bg-gray-100 p-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => {
              return (
                <option
                  key={category}
                  value={category === "All" ? "" : category}
                >
                  {category}
                </option>
              );
            })}
          </select>
          <label htmlFor="sort-select" className="text-gray-100 font-bold">
            Sorting by
          </label>
          <select
            id="sort-select"
            className=" bg-gray-100 p-2 rounded"
            value={sorted}
            onChange={(e) => {
              setSorted(e.target.value);
            }}
          >
            {sort.map((el) => {
              return (
                <option key={el} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </header>
  );
}
