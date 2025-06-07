import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useEditCabin() {
  // Access queryClient to manage the cache and invalidate queries
  const queryClient = useQueryClient();

  // Editing a cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => {
      createEditCabin(newCabinData, id);
    },
    onSuccess: () => {
      toast.success(' Cabin successfully edited!');

      // Invalidate the 'cabins' query to refetch the data after new cabin is added
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error(`Cabin could not be created: ${error.message}`);
    },
  });

  return { isEditing, editCabin };
}
