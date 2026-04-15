'use client';
import { useState, useEffect } from 'react';
import { productAPI, orderAPI } from '@/services/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminStats from '@/components/admin/AdminStats';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use allSettled so one failure doesn't kill both requests
      const [productsRes, ordersRes] = await Promise.allSettled([
        productAPI.getAll(),
        orderAPI.getAll()
      ]);

      // Extract from paginated response: { totalItems, totalPages, currentPage, data: [...] }
      const productsPayload = productsRes.status === 'fulfilled' ? productsRes.value.data : null;
      const ordersPayload = ordersRes.status === 'fulfilled' ? ordersRes.value.data : null;

      const totalProducts = productsPayload?.totalItems ?? 0;
      const orders = ordersPayload?.data || [];
      const totalOrders = ordersPayload?.totalItems ?? orders.length;

      // Track partial failures
      const failures = [];
      if (productsRes.status === 'rejected') failures.push('products');
      if (ordersRes.status === 'rejected') failures.push('orders');
      if (failures.length > 0) {
        setError(`Failed to load ${failures.join(' and ')}. Some stats may be incomplete.`);
      }

      const totalRevenue = orders
        .filter(order => order.paymentStatus === 'completed')
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      const pendingOrders = orders.filter(order => 
        (order.orderStatus === 'processing' || order.paymentStatus === 'pending')
      ).length;

      setStats({
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load dashboard data.');
      setStats({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return (
          <>
            {error && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
                <p className="text-yellow-800 text-sm">{error}</p>
                <button
                  onClick={fetchStats}
                  className="ml-4 text-sm text-yellow-700 underline hover:text-yellow-900"
                >
                  Retry
                </button>
              </div>
            )}
            <AdminStats stats={stats} loading={loading} />
          </>
        );
      case 'products':
        return <AdminProducts />;
      case 'orders':
        return <AdminOrders />;
      default:
        return <AdminStats stats={stats} loading={loading} />;
    }
  };

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your store efficiently</p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'stats', name: 'Overview' },
                  { id: 'products', name: 'Products' },
                  { id: 'orders', name: 'Orders' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-pink-500 text-pink-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </ProtectedRoute>
  );
}