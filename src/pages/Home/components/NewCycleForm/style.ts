import { styled } from "styled-components";

export const FormContainder = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["green-500"]};
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
    font-size: 0.875rem;
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;
`;

export const MinutesAmountInput = styled(BaseInput)`
  &::placeholder {
    text-align: center;
  }
`;

export const BaseCountdownButton = styled.button`
  width: 100%;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["gray-100"]};
  border: 0;
  border-radius: 8px;
  padding: 1rem;

  gap: 0.5rem;
  font-weight: bold;

  align-items: center;
  justify-content: center;
  display: flex;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-700"]};
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme["green-500"]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme["red-500"]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme["red-700"]};
  }
`;
