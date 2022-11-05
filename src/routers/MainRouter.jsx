import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";
import { MedPage } from "../pages/MedPage";
import { MedsPage } from "../pages/MedsPage";


export const MainRouter = () => {
    const loggedin = false;

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <MainPage />} />
                    <Route path="/medicamentos" element={ <MedsPage /> } />
                    <Route path="/medicamentos/:medId" element={ <MedPage /> } />
                    <Route path="login" element={ <LoginPage /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}
