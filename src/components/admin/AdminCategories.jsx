import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Layers, Plus, Edit3, Trash2, X, Check, Sparkles } from 'lucide-react';

export const AdminCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useShop();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    nameEn: '',
    icon: '🎀',
    description: '',
    count: 0
  });

  const openCreateModal = () => {
    setEditingCat(null);
    setFormData({
      id: 'cat-' + Date.now(),
      name: '',
      nameEn: '',
      icon: '🎀',
      description: '',
      count: 0
    });
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCat(cat);
    setFormData({
      id: cat.id,
      name: cat.name || '',
      nameEn: cat.nameEn || '',
      icon: cat.icon || '🎀',
      description: cat.description || '',
      count: cat.count || 0
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCat) {
      updateCategory(editingCat.id, formData);
    } else {
      addCategory(formData);
    }
    setModalOpen(false);
  };

  const emojiPresets = ['🎀', '👙', '🧦', '🌸', '🧣', '✨', '☁️', '🎁', '👑', '💎', '🌷', '🦋'];

  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900">مدیریت دسته‌بندی‌های بوتیک ({categories.length - 1} دسته)</h3>
          <p className="text-xs text-slate-500 mt-0.5">افزودن دسته‌های جدید، تغییر آیکون، نام‌ها و متون توضیحی</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-black px-5 py-2.5 rounded-2xl shadow-md shadow-pink-200 transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن دسته‌بندی جدید</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.filter(c => c.id !== 'all').map(cat => {
          const actualProductCount = products.filter(p => p.category === cat.id).length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-5 border border-pink-100/90 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2.5 bg-pink-50 rounded-2xl border border-pink-100">
                    {cat.icon}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-2 text-slate-600 hover:text-pink-600 bg-slate-50 hover:bg-pink-50 rounded-xl transition cursor-pointer"
                      title="ویرایش"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`آیا از حذف دسته‌بندی «${cat.name}» اطمینان دارید؟`)) {
                          deleteCategory(cat.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-1">{cat.name}</h4>
                <span className="text-[10px] text-slate-400 font-mono block mb-2">{cat.nameEn}</span>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{cat.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between text-xs">
                <span className="text-slate-400">تعداد محصولات:</span>
                <span className="font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-md">
                  {actualProductCount} کالا
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 text-right animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-lg w-full p-6 sm:p-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-5">
              <h3 className="text-base font-black text-slate-900">
                {editingCat ? `ویرایش دسته‌بندی: ${editingCat.name}` : 'افزودن دسته‌بندی جدید'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">نام فارسی دسته‌بندی *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثلاً: کراپ بند ماکارون"
                  className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">نام انگلیسی دسته‌بندی</label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="Macaron Crop Tops"
                  className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 font-mono dir-ltr text-left"
                />
              </div>

              {/* Emoji Picker */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">انتخاب آیکون ایموجی:</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {emojiPresets.map((em, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormData({ ...formData, icon: em })}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition cursor-pointer ${
                        formData.icon === em ? 'bg-pink-500 border-pink-500' : 'bg-slate-50 border-slate-200 hover:bg-pink-50'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">توضیحات کوتاه برای ویترین و مگامنو</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="توضیح کوتاه درباره این دسته از کالاها..."
                  className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-pink-300 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-pink-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black shadow-md cursor-pointer"
                >
                  ذخیره دسته‌بندی
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
