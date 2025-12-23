import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/signin'

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false
      }
    })

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Successfully verified - redirect to signin with success message
      return NextResponse.redirect(new URL(`${next}?verified=true`, req.url))
    }
  }

  // If there's an error, redirect to signin
  return NextResponse.redirect(new URL('/signin', req.url))
}