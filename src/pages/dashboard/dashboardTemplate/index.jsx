import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-pink-300 text-white">
        <div className="p-4 text-center text-xl font-bold">Logo</div>
        <nav>
          <ul>
            <li className="p-4 hover:bg-pink-200">
              <a href="/dashboard/product" className="flex items-center">
                <span className="material-icons">inventory</span>
                <span className="ml-2">Product</span>
              </a>
            </li>
            <li className="p-4 hover:bg-pink-200">
              <a href="/dashboard/staff" className="flex items-center">
                <span className="material-icons">people</span>
                <span className="ml-2">Staff</span>
              </a>
            </li>
            <li className="p-4 hover:bg-pink-200">
              <a href="/dashboard/order" className="flex items-center">
                <span className="material-icons">shopping_cart</span>
                <span className="ml-2">Order</span>
              </a>
            </li>
            <li className="p-4 hover:bg-pink-200">
              <a href="/dashboard/customer" className="flex items-center">
                <span className="material-icons">person</span>
                <span className="ml-2">Customer</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        <main className="flex-1 p-4 bg-pink-100">
          <div className="bg-white p-6 rounded-lg shadow">
            {/* thay the page trong children */}
            <Outlet />
          </div>
        </main>
        <footer className="bg-white text-center p-4">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;