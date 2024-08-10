import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
