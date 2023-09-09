import { useEffect, useState } from "react";
import { setStatus } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const BookDetail = () => {
  const { idTom } = useSelector((state) => state.books);
  const [book, setBook] = useState();
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
        navigate("/");
      }
      dispatch(setStatus("resolved"));
    };
    getData();
  }, [dispatch, idTom, navigate]);

  return (
    <>
      {!!book ? (
        <div className="flex flex-col md:flex-row">
          <div className="bg-gray-200 flex justify-center items-center w-full h-full p-8 md:w-1/2">
            {book.volumeInfo.imageLinks ? (
              <img
                className=" w-80 h-96 bg-cover shadow-[0px_5px_10px_2px] rounded"
                src={Object.values(book.volumeInfo.imageLinks).reverse()[0]}
                alt="book_image"
              />
            ) : (
              <div className="bg-white flex justify-center items-center w-80 h-96 bg-cover shadow-2xl rounded">
                no image
              </div>
            )}
          </div>
          <div className="w-full p-8 md:w-1/2">
            <p className=" text-gray-400">
              {book.volumeInfo.categories || <br />}
            </p>
            <h1 className="mt-4 text-xl font-bold">
              {book.volumeInfo.title || <br />}
            </h1>
            <p className="mt-2 text-gray-400">
              {book.volumeInfo.authors || <br />}
            </p>
            <p className="p-4 bg-gray-200 mt-4">
              {book.volumeInfo.description || <br />}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
