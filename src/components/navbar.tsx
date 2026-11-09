  import { Link } from "react-router-dom";
 
export function Navbar() {
  return (
    <nav className="bg-green-500 p-4 flex gap-4 text-white">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/produtos" className="hover:underline">Produtos</Link>
      
    </nav>
  );
}