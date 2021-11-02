import { Container, ArrowLeftIcon, ArrowRightIcon } from "./styles";

interface CarrouselButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  arrowpositon: "left" | "right";
}

export const CarrouselButton: React.FC<CarrouselButtonProps> = ({
  children,
  ref,
  arrowpositon,
  ...props
}) => {
  return (
    <Container {...props}>
      {arrowpositon === "left" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    </Container>
  );
};
