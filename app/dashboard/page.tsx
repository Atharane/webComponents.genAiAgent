import { nanoid } from '@/lib/utils'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
// import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: 'dashboard'
}

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
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      {/* <Chat id={id} session={session} missingKeys={missingKeys} /> */}
      <DashboardClient />
    </AI>
  )
}
