import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://kebnipzcsdjfyxgcsqvf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlYm5pcHpjc2RqZnl4Z2NzcXZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjAyNjUwNiwiZXhwIjoyMDMxNjAyNTA2fQ.iZZ_tt3iwuCIREKs3gHNActxm2k7qzD8YXjyjtf71bM"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;