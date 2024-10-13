import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './app/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log('Auth check satrt'); // Debugging line
  if (error) {
    console.log('Error during getUser:', error); // Debugging line
  }
  console.log('User:', user); // Debugging line
  if (!user && !request.nextUrl.pathname.startsWith('/login')) {
    console.log('Redirecting to butthole /login'); // Debugging line
    return NextResponse.redirect(new URL('/login', request.url));
  }
  console.log('Auth check end'); // Debugging line
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
