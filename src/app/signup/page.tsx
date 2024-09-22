// src/app/signup.tsx
import React from 'react';

const Signup: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {/* Add your signup form here */}
      <form>
        <input type="text" placeholder="Username" className="border p-2 mb-2 w-full text-black" />
        <input type="password" placeholder="Password" className="border p-2 mb-4 w-full text-black" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
