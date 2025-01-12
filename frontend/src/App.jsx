import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer.jsx";
import {Toaster} from "react-hot-toast";
import {useAuthStore} from "./store/authUser.js";
import {useEffect} from "react";
import {Loader} from "lucide-react";
import WatchPage from "./pages/home/Watchpage.jsx";
import SearchHistoryPage from "./pages/home/SearchHistoryPage.jsx";
import SearchPage from "./pages/home/SearchPage.jsx";
import NotFoundPage from "./pages/home/NotFoundPage.jsx";

function App() {
    const { user, isCheckingAuth, authCheck } = useAuthStore();

    useEffect(() => {
        authCheck();
    }, [authCheck]);

    if(isCheckingAuth){
        return (
            <div className={"h-screen"}>
                <div className={"flex justify-center items-center bg-black h-full"}>
                <Loader className={"animate-spin text-red-600 size-10 "} />
                </div>
            </div>
        )
    }

    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/>}/>
            <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to="/"/>}/>
            <Route path="/watch/:id" element={user ? <WatchPage/> : <Navigate to="/login"/>}/>
            <Route path="/search" element={user ? <SearchPage/> : <Navigate to="/login"/>}/>
            <Route path="/history" element={user ? <SearchHistoryPage/> : <Navigate to="/login"/>}/>
            <Route path="/*" element={<NotFoundPage /> }/>

        </Routes>
            <Footer />
            <Toaster />
        </>
    );
}

export default App
