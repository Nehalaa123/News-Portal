import Header from "../components/Header";
import Footer from "../components/Footer";
import Categories from "./Categories";
import Section from "./Section";
import HomePage from "./HomePage";
function Home() {
    return (
        <>
            <Header />
            <HomePage />
            <Categories />
            <Section />
            <Footer />
        </>
    )
}
export default Home;