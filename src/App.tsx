import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./components/RootLayout";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />} />
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App;
