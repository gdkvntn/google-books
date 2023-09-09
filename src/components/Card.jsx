import { Link } from "react-router-dom";
import { setIdTom } from "../store/slice";
import { useDispatch } from "react-redux";

export default function Card({ data }) {
  const { volumeInfo, id } = data;
  const dispatch = useDispatch();

  return (
    <div className="flex-[100%_0_1] p-6 bg-gray-100 rounded h-96 hover:shadow-2xl transition hover:scale-105 sm:flex-[49%_0_1] md:flex-[32%_0_1]  xl:flex-[24%_0_1]">
      <Link to={`/${volumeInfo.title}`} onClick={() => dispatch(setIdTom(id))}>
        <div className="flex flex-col ">
          <div className="flex justify-center">
            {volumeInfo.imageLinks ? (
              <img
                className=" w-36 h-48 bg-cover shadow-[0px_5px_10px_2px] rounded"
                src={volumeInfo.imageLinks.thumbnail}
                alt="book_image"
              />
            ) : (
              <div className="flex justify-center items-center w-36 h-48 bg-cover shadow-2xl rounded">
                no image
              </div>
            )}
          </div>

          <div className="mt-8 leading-4">
            <h2 className=" text-gray-400 underline">
              {volumeInfo.categories ? volumeInfo.categories[0] : <br />}
            </h2>
            <p className=" font-semibold mt-2 line-clamp-3">
              {volumeInfo.title || <br />}
            </p>
            <p className="mt-2 line-clamp-2">
              {volumeInfo.authors ? volumeInfo.authors.join(", ") : <br />}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
