import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">App Navbar</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Welcome</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          </li>

          
          <li>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </li>
          <li>
            <Link to="/expense" className="hover:text-gray-300">Expenses</Link>
          </li>
          <li>
            <Link to="/list" className="hover:text-gray-300">MyCalculations</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
