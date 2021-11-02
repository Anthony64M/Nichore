import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, useCallback, useRef } from "react";
import { ThemeProvider } from "styled-components";

import { useAuth } from "../../hooks/useAuth";
import { light } from "src/styles/themes/light";

import { AccountSignInTemplate } from "../../components/AccountSignInTemplate";
import { Input } from "../../components/ArtsyLib";

import { Container } from "../../styles/pages/account";

const Create: React.FC = () => {
  const { register } = useAuth();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault();

    await register({
      email: emailInputRef.current?.value.toLowerCase(),
      name: nameInputRef.current?.value,
      username: usernameInputRef.current?.value,
      password: passwordInputRef.current?.value,
    });
  };

  return (
    <ThemeProvider theme={light}>
      <AccountSignInTemplate>
        <Head>
          <title>Cadastre-se - Artsy</title>
        </Head>
        <Container>
          <span>
            <h2>Cadastrar</h2>
            <p>Preencha o formulário para criar uma conta!</p>
          </span>

          <form onSubmit={handleCreateUser}>
            <span>
              <label className="accountLabel">Email</label>
              <Input
                customtype="normalText"
                placeholder="Insira um e-mail válido"
                ref={emailInputRef}
                required
              />
            </span>
            <span>
              <label className="accountLabel">Nome</label>
              <Input
                customtype="normalText"
                placeholder="Insira o seu nome"
                ref={nameInputRef}
                required
              />
            </span>
            <span>
              <label className="accountLabel">Username</label>
              <Input
                customtype="normalText"
                placeholder="Insira o nome do seu usuário"
                ref={usernameInputRef}
                required
              />
            </span>
            <span>
              <label className="accountLabel">Senha</label>
              <Input
                customtype="password"
                placeholder="Insira a senha"
                ref={passwordInputRef}
                required
              />
            </span>

            <button type="submit">Cadastrar</button>
          </form>
          <p className="link">
            Deseja fazer login?{" "}
            <Link href="login">
              <strong>Clique aqui</strong>
            </Link>
          </p>
        </Container>
      </AccountSignInTemplate>
    </ThemeProvider>
  );
};

export default Create;
