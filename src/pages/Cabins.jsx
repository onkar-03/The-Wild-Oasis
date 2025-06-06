import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable.jsx';

function Cabins() {
  // Manually Fetching cabins data without React Query
  // useEffect(() => {
  //   getCabins()
  //     .then((data) => {
  //       console.log('Cabins data:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching cabins:', error);
  //     });
  // }, []);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
