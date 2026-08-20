import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  ShoppingBag, 
  Search, 
  Trash2, 
  Printer, 
  Eye, 
  X, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';

export const AdminOrders = () => {
  const { orders, updateOrderStatus, deleteOrder, formatPrice } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewingOrder, setViewingOrder] = useState(null);

  const filteredOrders = orders.filter(o => {
    const matchesStatus = selectedStatus === 'all' || o.status === selectedStatus;
    const matchesSearch = !searchQuery.trim() || 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (o.customerName && o.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.phone && o.phone.includes(searchQuery));
    return matchesStatus && matchesSearch;
  });

  const statusColors = {
    'pending': 'bg-amber-100 text-amber-900 border-amber-200',
    'processing': 'bg-pink-100 text-pink-900 border-pink-200',
    'shipped': 'bg-blue-100 text-blue-900 border-blue-200',
    'delivered': 'bg-emerald-100 text-emerald-900 border-emerald-200',
    'cancelled': 'bg-rose-100 text-rose-900 border-rose-200'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* 1. Top Bar */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900">مدیریت سفارشات مشتریان ({orders.length} سفارش)</h3>
          <p className="text-xs text-slate-500 mt-0.5">بررسی فاکتورها، تغییر وضعیت ارسال و مدیریت مرسولات پستی</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-pink-50 text-pink-700 px-3 py-1.5 rounded-xl border border-pink-200/60">
            {orders.filter(o => o.status === 'processing').length} سفارش در حال بسته‌بندی
          </span>
        </div>
      </div>

      {/* 2. Search & Status Filter */}
      <div className="bg-white rounded-3xl p-4 border border-pink-100/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="جستجو بر اساس شماره سفارش (مثلاً AS-89421) یا نام مشتری یا موبایل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-pink-50/70 text-xs rounded-xl pr-9 pl-3 py-2.5 border border-pink-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
          />
          <Search className="w-4 h-4 text-pink-400 absolute right-3 top-3" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold hidden sm:inline">فیلتر وضعیت:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 text-xs font-bold rounded-xl p-2.5 border border-slate-200 outline-none cursor-pointer"
          >
            <option value="all">همه سفارش‌ها</option>
            <option value="processing">در حال بسته‌بندی معطر</option>
            <option value="shipped">تحویل به پست / در مسیر</option>
            <option value="delivered">تحویل داده شده</option>
            <option value="pending">در انتظار بررسی</option>
            <option value="cancelled">لغو شده</option>
          </select>
        </div>
      </div>

      {/* 3. Orders Table */}
      <div className="bg-white rounded-3xl border border-pink-100/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-pink-50/60 text-slate-700 font-bold border-b border-pink-100">
              <tr>
                <th className="p-4">شماره سفارش و تاریخ</th>
                <th className="p-4">نام خریدار و تماس</th>
                <th className="p-4">مبلغ کل سفارش</th>
                <th className="p-4">شیوه ارسال</th>
                <th className="p-4">وضعیت سفارش</th>
                <th className="p-4 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-pink-50/30 transition">
                  <td className="p-4">
                    <div className="font-mono font-black text-pink-700">{order.id}</div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{order.date}</span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900">{order.customerName}</div>
                    <span className="text-[10px] text-slate-500 font-mono dir-ltr inline-block mt-0.5">
                      {order.phone}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-rose-600 font-mono">
                      {formatPrice(order.total)} تومان
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {order.itemsCount || 1} قلم کالا
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="text-slate-700 font-medium">
                      {order.shippingMethod || 'پست پیشتاز'}
                    </span>
                    {order.trackingCode && (
                      <span className="text-[10px] text-slate-400 font-mono block truncate max-w-[120px]">
                        کد: {order.trackingCode}
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status || 'processing'}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`text-[11px] font-bold rounded-xl px-2.5 py-1 border outline-none cursor-pointer ${
                        statusColors[order.status] || 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <option value="pending">در انتظار بررسی</option>
                      <option value="processing">در حال بسته‌بندی معطر</option>
                      <option value="shipped">تحویل به پست / در مسیر</option>
                      <option value="delivered">تحویل داده شده</option>
                      <option value="cancelled">لغو شده</option>
                    </select>
                  </td>

                  <td className="p-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingOrder(order)}
                        className="p-2 text-pink-600 hover:text-pink-800 bg-pink-50 hover:bg-pink-100 rounded-xl transition cursor-pointer"
                        title="مشاهده جزئیات فاکتور"
                      >
                        <FileText className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`آیا از حذف سفارش ${order.id} مطمئن هستید؟`)) {
                            deleteOrder(order.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                        title="حذف سفارش"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Order Detail & Print Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 text-right animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-5">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  فاکتور سفارش: <span className="font-mono text-pink-600">{viewingOrder.id}</span>
                </h3>
                <span className="text-[11px] text-slate-400">{viewingOrder.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 text-slate-600 hover:text-pink-600 bg-slate-100 hover:bg-pink-50 rounded-xl transition cursor-pointer"
                  title="چاپ فاکتور"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewingOrder(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Order Body Details */}
            <div className="space-y-4 text-xs">
              
              {/* Receiver card */}
              <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px]">تحویل‌گیرنده:</span>
                  <span className="font-bold text-slate-800">{viewingOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">شماره تماس:</span>
                  <span className="font-bold text-slate-800 font-mono">{viewingOrder.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">نشانی پستی:</span>
                  <span className="font-medium text-slate-700">{viewingOrder.address}</span>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-bold text-slate-800 mb-2">اقلام سفارش داده شده:</h4>
                <div className="space-y-2">
                  {viewingOrder.items?.map((item, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-pink-100" />
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <span className="text-[10px] text-slate-400">{item.selectedColor?.name || 'استاندارد'} • {item.quantity} عدد</span>
                        </div>
                      </div>
                      <span className="font-bold text-rose-600 font-mono">
                        {formatPrice(item.price * item.quantity)} تومان
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>هزینه حمل و نقل:</span>
                  <span className="font-bold">{viewingOrder.shippingCost ? `${formatPrice(viewingOrder.shippingCost)} ت` : 'رایگان'}</span>
                </div>
                {viewingOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>تخفیف جشنواره:</span>
                    <span>-{formatPrice(viewingOrder.discount)} تومان</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                  <span>مبلغ پرداخت شده نهایی:</span>
                  <span className="text-rose-600 font-mono text-base">{formatPrice(viewingOrder.total)} تومان</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
