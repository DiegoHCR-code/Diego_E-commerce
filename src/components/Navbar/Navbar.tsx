import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  Nav,
  Logo,
  NavLinks,
  StyledLink,
  CartCount,
} from "./Navar.styles";

const Navbar: React.FC = () => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Nav>
      <Logo to="/">E-Commerce</Logo>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/cart">
          Carrinho
          {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
        </StyledLink>
        <StyledLink to="/profile">Perfil</StyledLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;