import Header from "../components/landing/header";
import Footer from "../components/landing/footer";
import Hero from "../components/landing/hero";
import Appointments from "../components/landing/appointments";
import Faq from "../components/landing/faq";

function LandingPage() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <center>
          <Hero />
          <Appointments/>
          <Faq/>
        </center>
      </div>

      <Footer />
    </>
  );
}

export default LandingPage;
