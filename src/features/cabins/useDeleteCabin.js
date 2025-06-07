import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

// CUSTOM HOOK
export function useDeleteCabin() {
  // To use Query Client we use useQueryClient()
  // This is used to invalidate queries and refetch data
  const queryClient = useQueryClient();

  // Delete Cabins usign useMutation()
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),

    // Optionally, you can add a success message or refetch the cabins
    onSuccess: () => {
      // Invalidate the 'cabins' query to refetch the data
      queryClient.invalidateQueries({
        // Data to invalidate using queryKey
        queryKey: ['cabins'],
      });

      // Optionally, you can show a success message
      toast.success('Cabin deleted successfully');
    },
    onError: (error) => {
      // Handle error case
      toast.error(`${error.message}`);
    },
  });

  return { isDeleting, deleteCabin };
}
