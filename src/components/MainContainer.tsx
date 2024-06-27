import styled from 'styled-components';

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default MainContainer;
