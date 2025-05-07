import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { clearUser } from "../../redux/slices/userSlice";
import Button from "../../components/UI/Button/Button";
import { Container, Info, StyledLink } from "./Profile.styles";

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <Container>
      <h1>Perfil</h1>
      {user ? (
        <>
          <Info>
            <span><strong>Nome:</strong> {user.name}</span>
            <span><strong>Email:</strong> {user.email}</span>
          </Info>
          <Button variant="accent" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <p>Você não está logado.</p>
          <StyledLink to="/login">Ir para login</StyledLink>
        </>
      )}
    </Container>
  );
};

export default Profile;
