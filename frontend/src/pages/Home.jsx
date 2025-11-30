import Navbar from "@components/ui/Navbar.jsx";
import Footer from "@components/ui/Footer.jsx";
import Hero from "@components/sections/Hero.jsx";
import About from "@components/sections/About.jsx";
import Skills from "@components/sections/Skills.jsx";
import Projects from "@components/sections/Projects.jsx";
import Services from "@components/sections/Services.jsx";
import AIPlayground from "@components/sections/AIPlayground.jsx";
import Contact from "@components/sections/Contact.jsx";

const Home = ({ theme, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-cyber-darker">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <AIPlayground />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
