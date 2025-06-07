import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';
import FormRow from '../../pages/FOrmRow.jsx';

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // To get errors out of the Forma dn display in UI
  const { errors } = formState;
  // console.log(errors);

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: (id) => createCabin(id),
    onSuccess: () => {
      toast.success('New Cabin created successfully!');

      // Invalidate the 'cabins' query to refetch the data after new cabin is added
      queryClient.invalidateQueries({ queryKey: ['cabins'] });

      // Reset the form after successful submission
      reset();
    },
    onError: (error) => {
      toast.error(`Cabin could not be created: ${error.message}`);
    },
  });

  // onSubmit function to handle form submission and pass data to mutation for cabin creation
  const onSubmit = function (data) {
    console.log(data);

    // Assuming image is a FileList, we take the first file
    mutate({ ...data, image: data.image[0] });
  };

  const onError = function (errors) {
    // Handle form validation errors
    console.error('Form submission errors:', errors);
    // toast.error('Please fill in all required fields correctly.');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
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
            required: 'This Field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
