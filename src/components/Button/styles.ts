import { styled } from "styled-components";

export const ButtonContainer = styled.button`
  width: 40.5rem;
  height: 4rem;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  border: 0;
  border-radius: 8px;
  padding: 0.5rem 1.25rem 0.5rem 0.125rem;
  margin: 0.5rem;
`;
