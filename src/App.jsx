import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles.js';
import Button from './ui/Button.jsx';
import Input from './ui/Input.jsx';

// H1 styled component for the heading
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

// Styled component for the main app container
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Wild Oasis</H1>
        <Button onClick={() => alert('Check In!!')}>Check In</Button>
        <Button onClick={() => alert('Check Out!!')}>Check Out</Button>
        <Input type='text' placeholder='Enter your name' />
      </StyledApp>
    </>
  );
}

export default App;
