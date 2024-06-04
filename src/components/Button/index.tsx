import { ButtonHTMLAttributes } from "react";
import { ButtonContainer } from "./styles";
import { IconProps } from "phosphor-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}

export function Button({ text }: ButtonProps) {
  return (
    <>
      <ButtonContainer>{text}</ButtonContainer>
    </>
  );
}
