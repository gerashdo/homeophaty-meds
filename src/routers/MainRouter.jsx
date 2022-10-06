import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";
import { MedsPage } from "../pages/MedsPage";


export const MainRouter = () => {
    const loggedin = false;

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={ <MainPage />} />
                    <Route path="/medicamentos" element={ <MedsPage /> } />
                    <Route path="login" element={ <LoginPage /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}
