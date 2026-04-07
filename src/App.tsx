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
          <Route path="/general" element={<NewsArchive />} />
          <Route path="/science" element={<NewsArchive category="science" />} />
          <Route path="/entertainment" element={<NewsArchive category="entertainment" />} />
          <Route path="/technology" element={<NewsArchive category="technology" />} />
          <Route path="/business" element={<NewsArchive category="business" />} />
          <Route path="/health" element={<NewsArchive category="health" />} />
          <Route path="/sports" element={<NewsArchive category="sports" />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;