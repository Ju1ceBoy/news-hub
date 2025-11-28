import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NewsArchive from "./components/card/NewsArchive";
import { Header } from "./components/header/Header";
import styles from "./styles/Main.module.scss";

function App() {
  return (
      <Router>
      <Header />
        <div className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<NewsArchive />} />
          <Route path="/general" element={<NewsArchive year={2025} month={3} />} />
          <Route path="/science" element={<NewsArchive year={2025} month={3} />} />
          <Route path="/entertaiment" element={<NewsArchive year={2025} month={3} />} />
          <Route path="/technology" element={<NewsArchive year={2025} month={3} />} />
          <Route path="/business" element={<NewsArchive year={2025} month={3} />} />
          <Route path="/health" element={<NewsArchive year={2025} month={3} />} />
          <Route path="/sports" element={<NewsArchive year={2025} month={3} />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;