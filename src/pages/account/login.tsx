import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, useRef } from "react";
import { ThemeProvider } from 'styled-components'

import { useAuth } from "../../hooks/useAuth";
import { light } from "src/styles/themes/light";

import { AccountSignInTemplate } from "../../components/AccountSignInTemplate";
import { Input } from "../../components/ArtsyLib";

import { Container } from "../../styles/pages/account";

const Login: React.FC = () => {
  const { signIn } = useAuth();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    await signIn({
      email: emailInputRef.current?.value.toLowerCase(),
      password: passwordInputRef.current?.value,
    });
  };

  return (
    <ThemeProvider theme={light}>
      <AccountSignInTemplate>
        <Head>
          <title>Login - Artsy</title>
        </Head>
        <Container>
          <span>
            <h2>login</h2>
            <p>Preencha o formulário para realizar o seu login no Artsy!</p>
          </span>

          <form onSubmit={handleLogin}>
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
              <label className="accountLabel">Senha</label>
              <Input
                customtype="password"
                placeholder="Insira a senha"
                ref={passwordInputRef}
                required
                />
            </span>

            <button type="submit">Logar</button>
          </form>
          <p className="link">
            Deseja criar uma conta?{" "}
            <Link href="create">
              <strong>Clique aqui</strong>
            </Link>
          </p>
        </Container>
      </AccountSignInTemplate>
    </ThemeProvider>
  );
};

export default Login;
