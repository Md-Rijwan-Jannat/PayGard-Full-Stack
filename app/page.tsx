import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to PayGuard</h1>
      <p className="mb-4">Secure Payment Tracking and Verification System</p>
      <Link
        href="/auth/signin"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Get Started
      </Link>
    </div>
  );
}
