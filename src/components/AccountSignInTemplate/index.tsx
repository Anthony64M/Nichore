import { AccountSignInTemplateContainer } from "./styles";
import { ArtsyImage } from "@lib/Image";

export const AccountSignInTemplate: React.FC = ({ children }) => {
  return (
    <AccountSignInTemplateContainer>
      <aside>
        <h1>Artsy</h1>
        <p>Crie, conecte-se, e mostre para o mundo o que você sabe fazer.</p>
      </aside>

      <main>
        <div className="content">{children}</div>
      </main>

      <ArtsyImage src="/temple.jpg" />
    </AccountSignInTemplateContainer>
  );
};
