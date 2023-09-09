import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { paginateBooks } from "../store/slice";

export default function Main() {
  const state = useSelector((state) => state.books);
  const dispatch = useDispatch();

  return (
    <main className="flex flex-col items-center mb-6">
      {state.books.items ? (
        <>
          <p className=" text-center my-6 ">
            Found {state.books.totalItems} result
          </p>
          <div className="flex gap-y-4 gap-x-[2%] flex-wrap px-3 justify-start xl:gap-4">
            {state.books.items.map((book) => {
              return <Card key={book.id} data={book} />;
            })}
          </div>
          {state.startIndex >= state.books.totalItems ? null : (
            <button
              onClick={() => dispatch(paginateBooks())}
              className=" rounded mt-5 mb-5 p-4 border border-solid"
            >
              Load more
            </button>
          )}
        </>
      ) : state.status === null ? (
        <p className=" text-center my-6 ">Welcome!</p>
      ) : (
        <p className=" text-center my-6 ">Not result</p>
      )}
    </main>
  );
}
