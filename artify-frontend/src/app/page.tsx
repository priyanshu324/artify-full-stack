import BrowseRange from "@/src/components/home/BrowseRange";
import HeroBanner from "@/src/components/home/HeroBanner";
import Inspirations from "@/src/components/home/inspiration/Inspirations";
import Products from "@/src/components/home/products/Products";
import ShareSetup from "@/src/components/home/ShareSetup";



export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <BrowseRange />
      <Products />
      <Inspirations />
      <ShareSetup />
    </div>
  );
}
