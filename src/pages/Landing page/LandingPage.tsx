import Banner from "./Banner";
import Navbar from "./Navbar";
import CounsellorDetails from "./CounsellorDetails";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import WhatSayStudent from "./WhatSayStudent";
import WhatWeOffer from "./WhatWeOffer";

AOS.init();

const LandingPage = () => {
  return (
    <>
      <div id="Home">
        <Navbar />
      </div>
      <Banner />

      <div id="WhatWeOffer">
        <WhatWeOffer />
      </div>

      <div id="Counsellors">
        <CounsellorDetails />
      </div>

      <div id="WhatSayStudent">
        <WhatSayStudent />
      </div>

      <div id="Footer">
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
