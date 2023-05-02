import { Navigate, Route, Routes } from "react-router-dom"
import { PublicRoute } from "./PublicRoute"
import { LoginPage, RegisterPage } from "../auth"
import { HomePage } from "../shared/pages/HomePage"
import { PrivateRoute } from "./PrivateRoute"
import { ChatPage } from "../chat/pages/ChatPage"

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/login" element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            }></Route>

            <Route path="/register" element={
                <PublicRoute>
                    <RegisterPage />
                </PublicRoute>
            }></Route>

            <Route path="/chat" element={
                <PrivateRoute>
                    <ChatPage />
                </PrivateRoute>
            }></Route>

            <Route path="/" element={
                <PublicRoute>
                    <HomePage />
                </PublicRoute>
            }></Route>

            <Route path="/*" element={
                <Navigate to={'/'} />
            }></Route>
        </Routes>
    </>
  )
}
