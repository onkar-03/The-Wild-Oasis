import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://olexgmlscvbijnttoedq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sZXhnbWxzY3ZiaWpudHRvZWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NDMwMjUsImV4cCI6MjA2MDExOTAyNX0._YCLr0KqGh5m5RGB1QYhRFVjB7xaknHGTHuRcaWWQoA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
