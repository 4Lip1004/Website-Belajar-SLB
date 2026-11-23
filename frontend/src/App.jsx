import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./main_layout";

import PreLogin from "./views/pre_login";
import Login from "./views/login";
import Beranda from "./views/beranda";
import Latihan from "./views/latihan"
import LatihanDetail from "./views/latihan_detail"
import Profil from "./views/profil"
import DetailMateri from "./views/detail_materi";
import Materi from "./views/materi";
import Abjad from "./views/abjad";
import DetailAbjad from "./views/detail_abjad";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreLogin />} />
        <Route element={<MainLayout />}>

          <Route path="/latihan" element={<Latihan />} />
          <Route path="/latihan-detail" element={<LatihanDetail />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/detail-materi" element={<DetailMateri />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/abjad" element={<Abjad />} />
          <Route path="/detail-abjad" element={<DetailAbjad />} />


        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
