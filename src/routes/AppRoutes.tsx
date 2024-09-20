import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/useAuth";
import { useLoader } from "../hooks/useLoader";
import { Datasets } from "../pages/Datasets";
import { Login } from "../pages/Login";
import BodyRouter from "./BodyRouter";
import { PrivateRoute } from "./private.routes";

export function AppRoutes(){
    const { isLoading } = useLoader();
    return (
        <BodyRouter>
            {isLoading && <Loading />}
            <Router>
                <Routes>
                    <Route path="" element={<Login />} />
                    <Route
                        path="/datasets"
                        element={
                            <PrivateRoute>
                                <Datasets />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </BodyRouter>
    )
}