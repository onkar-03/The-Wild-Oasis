import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable.jsx';
import Button from '../ui/Button.jsx';
import CreateCabinForm from '../features/cabins/CreateCabinForm.jsx';
import { useState } from 'react';

function Cabins() {
  const [showForm, setShowForm] = useState(false);

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
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new Cabin{' '}
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
