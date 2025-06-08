import Button from '../../ui/Button.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';
import Modal from '../../ui/Modal.jsx';
import CreateTable from './CabinTable.jsx';

// Implementing With Compound Component
function AddCabin() {
  return (
    <div>
      <Modal>
        {/* Component to open Modal Button
         */}
        <Modal.Open opens='cabin-form'>
          {/* Here we want the user to be able to pass in the Button itself */}
          <Button>Add new cabin</Button>
        </Modal.Open>
        {/* Modal Window */}
        <Modal.Window name='cabin-form'>
          {/* Content */}
          <CreateCabinForm />
        </Modal.Window>

        {/* We can very easily add another <Modal.Open></Modal.Open> and window just copy paste the code with different props */}

        {/* <Modal.Open opens='table'>
        <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name='table'>
        <CreateTable />
        </Modal.Window> */}
      </Modal>
    </div>
  );
}

// Implementing Without Compound Component
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
