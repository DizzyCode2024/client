import styled from 'styled-components';

const Indicator = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 0.4rem;
  height: 60%;
  background-color: white;
  border-radius: 0 0.5rem 0.5rem 0;
  transition: all 0.3s ease-in-out;
`;

export default Indicator;
