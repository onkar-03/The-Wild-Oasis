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
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('Cabin could not be deleted !!');
  }
}

export async function createCabin(newCabin) {
  // URL
  // https://olexgmlscvbijnttoedq.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );

  // Create path of Image
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  // 1. Create Cabin
  const { data, error } = await supabase
    .from('cabins')
    // Extract the Image Path
    .insert({ ...newCabin, image: imagePath });

  if (error) {
    throw new Error('Cabin could not be created !!');
  }

  // 2. Upload Image
  const { storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // Prevent new cabin from being created if image upload fails
  // 3. Delete cabin if there was error in uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log('Cabin could not be created (Storgae Error)!!');
  }
  return data;
}
