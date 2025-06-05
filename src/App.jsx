import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles.js';
import Button from './ui/Button.jsx';
import Input from './ui/Input.jsx';
import Heading from './ui/Heading.jsx';
import Row from './ui/Row.jsx';

// H1 styled component for the heading
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

// Styled component for the main app container
const StyledApp = styled.div`
  /* background-color: orangered;s */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type='horizontal'>
          <Heading as='h1'>Wild Oasis</Heading>
          <div>
            <Heading as='h2'>Check In & Out</Heading>
            <Button
              variation='primary'
              size='medium'
              onClick={() => alert('Check In!!')}
            >
              Check In
            </Button>
            <Button
              variation='secondary'
              size='small'
              onClick={() => alert('Check Out!!')}
            >
              Check Out
            </Button>
          </div>
        </Row>

        {/* Didnt give type 'vertical' as its already set as defualt prop in Row Styled Component Props */}
        <Row>
          <Heading as='h3'>Form</Heading>
          <form>
            <Input type='text' placeholder='Enter your name' />
            <Input type='text' placeholder='Enter your name' />
          </form>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
