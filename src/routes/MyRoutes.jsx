import { Route, Routes } from "react-router-dom";
import withDynamicImport from "services/withDynamicImport";
import { DETAILS_PATH, HOME_PATH } from "./routes.constants";

export default function MyRoutes() {
  const HomePage = withDynamicImport(() => import('pages/Home/HomePage'));
  const MoviePage = withDynamicImport(() => import('pages/Movie/MoviePage'));

  return (
    <Routes>
      <Route exact path={HOME_PATH} element={<HomePage />} />
      <Route path={DETAILS_PATH} element={<MoviePage />} />
    </Routes>
  )
}
