import Link from "next/link";
import { signOut } from "next-auth/react";

import { Session } from "next-auth";

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          PayGuard
        </Link>
        <div>
          {session ? (
            <>
              <Link href="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="bg-blue-500 px-4 py-2 rounded">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
