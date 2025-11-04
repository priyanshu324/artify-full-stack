import Footer from "../components/footer/Footer";
import BrowseRange from "../components/home/BrowseRange";
import HeroBanner from "../components/home/HeroBanner";
import Inspirations from "../components/home/inspiration/Inspirations";
import Products from "../components/home/products/Products";
import ShareSetup from "../components/home/ShareSetup";
import Navbar from "../components/navbar/NavBar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <BrowseRange />
      <Products />
      <Inspirations />
      <ShareSetup />
      <Footer />
    </div>
  );
}
