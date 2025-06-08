import Heading from '../ui/Heading.jsx';
import Row from '../ui/Row.jsx';
import BookingTable from '../features/bookings/BookingTable.jsx';

function Bookings() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All bookings</Heading>
        <p> Test</p>
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
