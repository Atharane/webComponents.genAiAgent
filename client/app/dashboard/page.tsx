// import { createClient } from "@/utils/supabase/server";

import { redirect } from 'next/navigation'
import DashboardClient from './client'

export default async function Dashboard() {
  //   const supabase = createClient();
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   if (!user) {
  //     return redirect("/login");
  //   }

  return <DashboardClient />
}
