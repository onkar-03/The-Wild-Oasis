import CabinTable from '../features/cabins/CabinTable.jsx';
import AddCabin from '../features/cabins/AddCabin.jsx';

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
      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
