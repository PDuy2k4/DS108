import { Routes, Route } from "react-router-dom";
import Main from "./components/Layout/Main";
import Jobpage from "./pages/JobPage";
// import DropBox from "./components/DropBox/DropBox";
// import JobList from "./components/Job/JobList";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main></Main>}>
          {/* <Route path="/" element={<HomePage></HomePage>} /> */}
          <Route path="/" element={<Jobpage></Jobpage>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
