import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
  // Access queryClient to manage the cache and invalidate queries
  const queryClient = useQueryClient();

  // Deleting a cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (id) => createEditCabin(id),
    onSuccess: () => {
      toast.success('New Cabin created successfully!');

      // Invalidate the 'cabins' query to refetch the data after new cabin is added
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error(`Cabin could not be created: ${error.message}`);
    },
  });

  return { isCreating, createCabin };
}
