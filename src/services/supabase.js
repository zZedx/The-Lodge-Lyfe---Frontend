import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nqecmmwdoyvwwbyqcmyc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZWNtbXdkb3l2d3dieXFjbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3OTE0NDcsImV4cCI6MjAxMzM2NzQ0N30.6oqY16G9EtfUyywN9apHnf8G_e6OyfXv8mea_XX1FsM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
