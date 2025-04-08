import Navbar from "../components/NavBar";
export default async function ProtectedLayout({ children }) {
  // Check authentication

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto">{children}</main>
    </div>
  );
}
