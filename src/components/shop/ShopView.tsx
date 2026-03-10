'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, BookOpen, Sparkles, Search } from 'lucide-react';
import { products, categories, type Product } from '@/data/products';

interface ShopViewProps {
  onOpenChat?: (productId: string) => void;
}

export default function ShopView({ onOpenChat }: ShopViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(2);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="content-area px-5 pt-2 pb-4">
      {/* Ambient */}
      <div
        className="ambient-orb"
        style={{ width: 160, height: 160, background: 'var(--color-accent-lavender)', top: -30, left: -40 }}
      />

      {/* Search + Cart */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
        >
          <Search size={15} style={{ color: 'var(--color-text-tertiary)' }} />
          <span className="text-[13px]" style={{ color: 'var(--color-text-tertiary)' }}>Search products...</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}
        >
          <ShoppingCart size={17} style={{ color: 'var(--color-text-secondary)' }} />
          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full text-[9px] font-bold flex items-center justify-center"
              style={{ background: 'var(--color-accent-gold)', color: 'var(--color-background)', width: 18, height: 18 }}
            >
              {cartCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* AI recommendation banner */}
      <div
        className="glass-card p-4 mb-4 flex items-center gap-3"
        style={{ borderColor: 'rgba(212, 165, 116, 0.2)' }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(212, 165, 116, 0.15)' }}
        >
          <Sparkles size={18} style={{ color: 'var(--color-accent-gold)' }} />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
            Personalized for you
          </p>
          <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
            Based on your wellness profile and biomarkers
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`gathering-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <ProductCard
              product={product}
              isSelected={selectedProduct === product.id}
              onSelect={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
              onAskAI={() => onOpenChat?.(product.id)}
              onAddToCart={() => setCartCount(c => c + 1)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  isSelected,
  onSelect,
  onAskAI,
  onAddToCart,
}: {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  onAskAI: () => void;
  onAddToCart: () => void;
}) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'var(--color-surface-card)',
        border: isSelected ? '1px solid rgba(212, 165, 116, 0.4)' : '1px solid var(--color-border-subtle)',
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      layout
    >
      {/* Visual */}
      <div
        className="h-28 flex items-center justify-center relative"
        style={{ background: product.gradient }}
      >
        <span className="text-3xl">{product.emoji}</span>
        <div
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.7)' }}
        >
          {product.category.replace(' and nutrition', '').replace(' Tech', '')}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="text-[13px] font-medium leading-tight mb-1" style={{ color: 'var(--color-text-primary)' }}>
          {product.name}
        </h4>
        <p className="text-[11px] leading-snug mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
          {product.description}
        </p>
        <p className="text-[13px] font-bold" style={{ color: 'var(--color-accent-gold)' }}>
          {product.priceRange}
        </p>
      </div>

      {/* Expanded actions */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onAskAI(); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium"
                style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-subtle)' }}
              >
                <BookOpen size={12} />
                Learn More
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium"
                style={{ background: 'var(--color-accent-gold)', color: 'var(--color-background)' }}
              >
                <ShoppingCart size={12} />
                Add
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
