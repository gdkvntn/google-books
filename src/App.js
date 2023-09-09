import { useSelector } from "react-redux";
import { BookDetail } from "./components/BookDetail";
import ErrorPage from "./components/ErrorPage";
import Header from "./components/Header";
import Main from "./components/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Loader } from "./components/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: ":bookId",
    element: <BookDetail />,
  },
]);

function App() {
  const { status } = useSelector((state) => state.books);

  return (
    <>
      <Header />
      {status === "loading" ? <Loader /> : null}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
