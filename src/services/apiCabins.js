import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  //.from we can create queries on the table and the fields we want to select
  // This resturns a promise that we await which is stored in data
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    alert('Error fetching cabins !!');
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('Cabin could not be deleted !!');
  }
}

export async function createEditCabin(newCabin, id) {
  // Check if the image has supabase url i.e. already uploaded image or a new one selected by user as it does not have the supabase url in it
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // URL
  // https://olexgmlscvbijnttoedq.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );

  // Create path of Image
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  let query = supabase.from('cabins');

  // 1.1 Create Cabin: if no id means we want to create a new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 1.2 Edit Cabin: if id is present means we want to edit an existing cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload Image

  // If image there return
  if (hasImagePath) return data;

  // else upload the image to supabase storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete cabin if there was error in uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created',
    );
  }
}
