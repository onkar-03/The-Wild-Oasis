import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../pages/FOrmRow.jsx';

import { useCreateCabin } from './useCreateCabin.js';
import { useEditCabin } from './useEditCabin.js';

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // Import the custom hook for creating cabins
  const { isCreating, createCabin } = useCreateCabin();

  // Import the custom hook for editing cabins
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  // Retrieve the cabin ID and values from the cabinToEdit prop
  const { id: editId, ...editValues } = cabinToEdit;

  // var to store the state either we want to create a new form or edit an existing one
  // if editId is present, we are editing an existing cabin
  // if editId is not present, we are creating a new cabin
  const isEditSession = Boolean(editId);

  // Log the editValues to ensure they are correct
  console.log('editValues:', editValues);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    // Use editValues if editing, otherwise use empty object
    defaultValues: isEditSession ? editValues : {},
  });

  // To get errors out of the Forma dn display in UI
  const { errors } = formState;
  // console.log(errors);

  // onSubmit function to handle form submission and pass data to mutation for cabin creation
  const onSubmit = function (data) {
    // console.log(data);

    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        {
          newCabinData: { ...data, image },
          id: editId,
        },
        {
          onSuccess: (data) => {
            // console.log(data);
            // Reset the form after successful submission
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      // Assuming image is a FileList, we take the first file
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            // console.log(data);
            // Reset the form after successful submission
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  };

  const onError = function (errors) {
    // Handle form validation errors
    console.error('Form submission errors:', errors);
    // toast.error('Please fill in all required fields correctly.');
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', {
            required: 'This Field is required',
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This Field is required',
            min: {
              value: 1,
              message: 'Minimum capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This Field is required',
            min: {
              value: 100,
              message: 'Minimum price must be at least 100',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This Field is required',
            validate: (value) => {
              // getValues is a function from react-hook-form to get the current value of a field
              const regularPrice = getValues('regularPrice');
              if (value < 0) {
                return 'Discount cannot be negative';
              } else if (value >= regularPrice) {
                return 'Discount should be less than the regular price';
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Description for Website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isWorking}
          {...register('description', {
            required: 'This Field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin Photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This Field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {/* Deafult params in Form does not set the Image File, it still stays
          empty hence we conditionally render the is required for the image
          field based on its a new cabin or a cabin to edit */}
          {isEditSession ? 'Edit Cabin' : 'Create New Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
