import { useEffect, useState } from "react";
import { setStatus } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";

export const BookDetail = () => {
  const { idTom } = useSelector((state) => state.books);
  const [book, setBook] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatus("loading"));
    const getData = async () => {
      try {
        const data = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${idTom}?key=${process.env.REACT_APP_API_KEY}`
        );
        const res = await data.json();

        setBook(res);
        if (!data.ok) {
          throw new Error("Error!");
        }
      } catch (error) {
        alert(error);
      }
      dispatch(setStatus("resolved"));
    };
    getData();
  }, [idTom]);
  console.log(book);
  return (
    <>
      {!!book.volumeInfo ? (
        <div className="flex">
          <div className="bg-gray-200 flex justify-center items-center w-1/2 h-full p-8">
            {book.volumeInfo.imageLinks ? (
              <img
                className=" w-80 h-96 bg-cover shadow-[0px_5px_10px_2px] rounded"
                src={book.volumeInfo.imageLinks.extraLarge}
                alt="book_image"
              />
            ) : (
              <div className="bg-white flex justify-center items-center w-80 h-96 bg-cover shadow-2xl rounded">
                no image
              </div>
            )}
          </div>
          <div className="w-1/2 p-8">
            <p className=" text-gray-400">
              {book.volumeInfo.categories || <br />}
            </p>
            <h1 className="mt-4 text-xl font-bold">
              {book.volumeInfo.title || <br />}
            </h1>
            <p className="mt-2 text-gray-400">
              {book.volumeInfo.authors || <br />}
            </p>
            <p className="p-4 bg-gray-200 mt-4">{book.volumeInfo || <br />}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
