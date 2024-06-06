import { HeaderContainer } from "./style";
import igniteLogo from "../../assets/ignite-logo.svg";
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={igniteLogo} alt="" />
      <nav>
        <NavLink to="/" title="Temporizador" data-testid="lnk-timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico" data-testid="lnk-history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
