import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import RandomCats from './pages/RandomCats';
import SearchCats from './pages/SearchCats';
import ShowcaseLayout from './pages/showcase/ShowcaseLayout';
import ButtonShowcase from './pages/showcase/ButtonShowcase';
import InputShowcase from './pages/showcase/InputShowcase';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/random-cats" element={<RandomCats />} />
          <Route path="/search-cats" element={<SearchCats />} />
          <Route path="/showcase" element={<ShowcaseLayout />}>
            <Route index element={<Navigate to="button" replace />} />
            <Route path="button" element={<ButtonShowcase />} />
            <Route path="input" element={<InputShowcase />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
