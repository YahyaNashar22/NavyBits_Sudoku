import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Game from "../pages/Game";
import ScoreBoard from "../pages/ScoreBoard";
import HowToPlay from "../pages/HowToPlay";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/scoreboard" element={<ScoreBoard />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
