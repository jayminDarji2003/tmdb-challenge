import Header from "./components/Header";
import Footer from "./components/Footer";
import CastSlider from "./components/CastSlider";
import MovieSlider from "./components/MovieSlider";
import MovieVideoSlider from "./components/MovieVideoSlider";

export default function Home() {
  return (
    <main>
      <Header />
      <MovieVideoSlider />
      <MovieSlider />
      <CastSlider />
      <Footer />
    </main>
  );
}
