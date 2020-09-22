import styled from "styled-components";
import BaseButton from "./BaseButton";
import { theme } from "constants/theme";
const { royalBlue, white, black } = theme.colors;
const { display } = theme.typography.font.family;

const LinkButton = styled(BaseButton).attrs(({ size, inline }) => {
  return { size, inline };
})`
  width: 32.7rem;
  height: 5.46rem;
  border-radius: 4.6rem;
  border: solid 0 ${black};
  font-family: ${display};
  font-size: 1.8rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${white};
  background-color: ${royalBlue};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  text-align:center;
`;

export default LinkButton;