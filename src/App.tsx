import './App.css'
import NewsArchive from './components/card/NewsArchive';
import { Header } from './components/header/Header'
import styles from "./styles/Main.module.scss";


function App() {
  
  return (
    <>
      <div className={styles.mainContent}>
        <Header/>
        <NewsArchive/>
      </div>
    </>
  )
}

export default App

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./queryClient";
// import NewsArchive from "./components/card/NewsArchive";
// import AnotherComponent from "./components/card/NewsArchive";
// import { Header } from "./components/header/Header";
// import styles from "./styles/Main.module.scss";


// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//           <Header/>
//           <div className={styles.mainContent}>
//             <Routes>
//               <Route path="/news-hub" element={<NewsArchive />} />
//               <Route path="/general/news-hub" element={<AnotherComponent />} />
//             </Routes>
//           </div>
//       </Router>
//     </QueryClientProvider>
//   );
// }

// export default App;