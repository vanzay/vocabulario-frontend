import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";
import {useUserService} from "./services/useUserService";
import {NavigationItem} from "./NavigationItem";
import {AuthContext} from "./AuthState";

export const Header = () => {

  const {t} = useTranslation();
  const userService = useUserService();
  const auth = useContext(AuthContext);

  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  }

  const logout = () => {
    auth.logout();
    userService.logout();
    setMenuOpened(false);
  }

  return (
    <div className="w-nav navbar">
      <Helmet>
        <title>Vocabular.io</title>
      </Helmet>
      <div className="w-container nav_container">
        <nav className="w-nav-menu w-clearfix nav_menu">
          <NavigationItem link="/" title={t("app.navi.materials")}/>
          {auth.user && <NavigationItem link="/shelf" title={t("app.navi.shelf")}/>}
          {auth.user && <NavigationItem link="/dictionary" title={t("app.navi.dictionary")}/>}
          <NavigationItem link="/help" title={t("app.navi.help")}/>
          {auth.user &&
          <div className="w-dropdown nav_dropdown">
            <div className="w-dropdown-toggle w-clearfix nav_dropdown_toggle" onClick={toggleMenu}>
              <div className="avatar">{auth.user.email.substring(0, 1).toUpperCase()}</div>
              <div className="username">{auth.user.email}</div>
              <div className="w-icon-dropdown-toggle nav_dropdown_arr"/>
            </div>
            <nav className={"w-dropdown-list nav_dropdown_list" + (menuOpened ? " w--open" : "")}>
              <div className="nav_dropdown_list_arr"/>
              <div className="nav_dropdown_visible">
                {/*<span className="w-dropdown-link nav_dropdown_link">Settings</span>*/}
                <span className="w-dropdown-link nav_dropdown_link"
                      onClick={logout}>{t("action.logout")}</span>
              </div>
            </nav>
          </div>
          }
          {/*{!auth.user && <NavigationItem link="/user/register" title={t("action.register")}/>}*/}
          {!auth.user && <NavigationItem link="/user/login" title={t("action.login")}/>}
        </nav>

        <Link to="/">
          <div className="nav_logo">{t("app.title")}</div>
        </Link>
        <div className="nav_slogan">{t("app.tagline")}</div>
      </div>
    </div>
  );
}
