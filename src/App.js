import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import {Provider as AlertProvider} from "react-alert";
import {AuthProvider} from "./components/AuthState";
import {RequireAuth} from "./components/RequireAuth";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import AlertTemplate from "./components/AlertTemplate";
import {AboutPage} from "./components/pages/AboutPage";
import {HelpPage} from "./components/pages/HelpPage";
import {LoginPage} from "./components/pages/user/LoginPage";
import {RegisterPage} from "./components/pages/user/RegisterPage";
import {RestorePage} from "./components/pages/user/RestorePage";
import {ChangePasswordPage} from "./components/pages/user/ChangePasswordPage";
import {SearchPage} from "./components/pages/search/SearchPage";
import {ShelfPage} from "./components/pages/shelf/ShelfPage";
import {BookPage} from "./components/pages/book/BookPage";
import {LanguagesPage} from "./components/pages/dictionary/LanguagesPage";
import {DictionaryPage} from "./components/pages/dictionary/DictionaryPage";
import {TrainingPage} from "./components/pages/training/TrainingPage";
import {NotFoundPage} from "./components/pages/NotFoundPage";

import "./css/webflow.css";
import "./css/app.css";
import "./css/app-old.css";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <HelmetProvider>
          <Header/>
          <div className="content">
            <AlertProvider template={AlertTemplate} timeout={3000} position="top center" offset="30px"
                           containerStyle={{zIndex: 5000}}>
              <Routes>
                <Route exact path="/" element={<SearchPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/user/login" element={<LoginPage/>}/>
                <Route path="/user/register" element={<RegisterPage/>}/>
                <Route path="/user/restore" element={<RestorePage/>}/>
                <Route path="/user/change-password" element={<ChangePasswordPage/>}/>
                <Route path="/book/info/:id" element={<BookPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/help" element={<HelpPage/>}/>
                <Route element={<RequireAuth/>}>
                  <Route path="/shelf" element={<ShelfPage/>}/>
                  <Route exact path="/dictionary" element={<LanguagesPage/>}/>
                  <Route path="/dictionary/terms" element={<DictionaryPage/>}/>
                  <Route path="/training" element={<TrainingPage/>}/>
                </Route>
                <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
            </AlertProvider>
          </div>
          <Footer/>
        </HelmetProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
