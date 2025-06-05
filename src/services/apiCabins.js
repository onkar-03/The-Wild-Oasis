import supabase from './supabase';

export async function getCabins() {
  //.from we can create queries on the table and the fields we want to select
  // this resturns a promise that we await which is stored in data
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    alert('Error fetching cabins: ' + error.message);
  }
  return data;
}
