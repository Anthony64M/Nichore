import Link from "next/link";
import React, { useContext } from "react";
import { BsSun } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

import { ArtsyThemeContext } from "../../contexts/themeContext";
import { useAuth } from "../../hooks/useAuth";

import { Button, Dropdown } from "../ArtsyLib";
import { SearchInput } from "./SearchInput";
import { Container, PencilIcon } from "./styles";

export const Header: React.FC = () => {
  const { toggleTheme, theme } = useContext(ArtsyThemeContext);
  const { user } = useAuth();

  return (
    <Container>
      <Link href="/">
        <h1>Artsy</h1>
      </Link>

      <button onClick={toggleTheme}>
        {theme.title === "dark" ? (
          <BsSun color="#D2D2D2" size={24} />
        ) : (
          <FaMoon color="#989898" size={24} />
        )}
      </button>
      <div className="wrapper">
        <div className="functionalities">
          <SearchInput />
          {user ? (
            <Link href="/postWork" passHref>
              <Button color="cardBackground" size="md" className="addArt">
                Poste seu trabalho
                <PencilIcon />
              </Button>
            </Link>
          ) : (
            <Link href="/account/login" passHref>
              <Button color="cardBackground" size="md" className="login">
                Fazer login
              </Button>
            </Link>
          )}
        </div>

        {user && (
          <div className="user">
            <div className="avatar">
              <img src={user.userImage} alt={user.username} />

              <Dropdown
                dropdownType="config"
                items={[
                  {
                    itemId: 0,
                    itemUrl: `/account/${user.email}`,
                    content: "Conta",
                  },
                  {
                    itemId: 1,
                    itemUrl: `/account/${user.email}/followers`,
                    content: "Seguidores",
                  },
                  {
                    itemId: 2,
                    itemUrl: `/account/${user.email}/following`,
                    content: "Seguindo",
                  },
                  {
                    itemId: 3,
                    itemUrl: "/postWork",
                    content: "Criar Arte",
                  },
                  {
                    itemId: 4,
                    content: "Sair",
                    itemType: "logout",
                  },
                ]}
                layer={99}
                id="header-page"
              />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
