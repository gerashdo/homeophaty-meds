import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";
import { MedPage } from "../pages/MedPage";
import { MedsPage } from "../pages/MedsPage";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";


export const MainRouter = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={ 
                        <PrivateRouter>
                            <Routes>
                                <Route path="/" element={ <MainPage /> } />
                                <Route path="/medicamentos" element={ <MedsPage /> } />
                                <Route path="/medicamentos/:medId" element={ <MedPage /> } />
                            </Routes>
                        </PrivateRouter>
                    } />
                    <Route path="login" element={
                        <PublicRouter>
                            <LoginPage /> 
                        </PublicRouter>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    )
}
