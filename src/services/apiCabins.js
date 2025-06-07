import supabase from './supabase';

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
  const { data, error } = await supabase.from('cabins').insert([newCabin]);

  if (error) {
    throw new Error('Cabin could not be created !!');
  }
  return data;
}
