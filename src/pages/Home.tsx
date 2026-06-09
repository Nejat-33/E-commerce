
import Categorysections from "../component/home/categorysections";
import HeroSlider from "../component/home/Heroslider";
import Promo from "../component/home/promo";
import Recentaction from "../component/home/Recentaction";
import FinalCTA from "../component/home/Finalcta";
import Categoryfilteration from "../component/navbar/Categoryfilteration";


function Home() {

  return (
    <main className="max-w-7xl mx-auto px-4">
      <Categoryfilteration />
      <HeroSlider />
      <Categorysections />
      <Promo />
      <Recentaction />
      <FinalCTA />
    </main>
  );
}

export default Home
