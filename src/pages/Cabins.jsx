import CabinTable from '../features/cabins/CabinTable.jsx';
import AddCabin from '../features/cabins/AddCabin.jsx';
import Row from '../ui/Row.jsx';
import Heading from '../ui/Heading.jsx';
import CabinTableOperations from '../features/cabins/CabinTableOperations.jsx';

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
        <Heading as='h1'>All Cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
