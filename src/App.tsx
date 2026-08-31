import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { OrderTrackingSection } from './components/OrderTrackingSection';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MobileBottomNav } from './components/MobileBottomNav';

import { PRODUCTS, SPOTLIGHT_ITEMS } from './data/products';
import { CategoryType, Product, CartItem } from './types';

export default function App() {
  // Onboarding & Preferences
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedVibeCategories, setSelectedVibeCategories] = useState<CategoryType[]>(['BAG', 'AUDIO']);
  const [budgetLimit, setBudgetLimit] = useState<number>(50);
  const [hapticEnabled, setHapticEnabled] = useState<boolean>(true);

  // Filter & Spotlight State
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [activeAddId, setActiveAddId] = useState<string | null>(null);

  // Cart & UI Drawers
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[2], qty: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Auto-shuffle spotlight banner
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % SPOTLIGHT_ITEMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filter products by category and max budget
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCat =
      selectedCategory === 'ALL' ||
      item.tags.includes(selectedCategory) ||
      item.category === selectedCategory;
    const matchesBudget = item.price <= budgetLimit;
    return matchesCat && matchesBudget;
  });

  // Haptic feedback helper
  const triggerHaptic = () => {
    if (hapticEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(60);
      } catch {
        // Safe fallback if permission not granted
      }
    }
  };

  // Add to cart with feedback
  const handleAddToCart = (product: Product) => {
    triggerHaptic();
    setActiveAddId(product.id);
    setTimeout(() => setActiveAddId(null), 600);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    triggerHaptic();
    setIsOrderPlaced(true);
    setTimeout(() => {
      setIsOrderPlaced(false);
      setCartItems([]);
      setIsCartOpen(false);
    }, 2400);
  };

  const toggleVibeCategory = (cat: CategoryType) => {
    setSelectedVibeCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const totalCartCount = cartItems.reduce((acc, cur) => acc + cur.qty, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 selection:bg-[#00FFCC] selection:text-black font-mono tracking-tight antialiased overflow-x-hidden">
      {/* Desktop Persistent Sidebar */}
      <Sidebar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPreferences={() => setShowOnboarding(true)}
      />

      {/* Mobile Top Header */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="lg:ml-[240px] min-h-screen">
        {/* Hero Showcase Section */}
        <HeroSection
          spotlightItems={SPOTLIGHT_ITEMS}
          currentSpotlightIndex={spotlightIndex}
          onShuffle={() => setSpotlightIndex((prev) => (prev + 1) % SPOTLIGHT_ITEMS.length)}
          onSelectSpotlightIndex={(idx) => setSpotlightIndex(idx)}
          onAddToCart={handleAddToCart}
        />

        {/* Ticker & Category Filter Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          itemCount={filteredProducts.length}
          maxBudget={budgetLimit}
          onOpenPreferences={() => setShowOnboarding(true)}
        />

        {/* Product Grid Section */}
        <div id="grid">
          <ProductGrid
            products={filteredProducts}
            activeAddId={activeAddId}
            onAddToCart={handleAddToCart}
            onSelectProduct={(prod) => setSelectedProductDetail(prod)}
            maxBudget={budgetLimit}
            onResetFilters={() => {
              setSelectedCategory('ALL');
              setBudgetLimit(100);
            }}
          />
        </div>

        {/* Order Tracking Section */}
        <OrderTrackingSection />
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Order Success Popup */}
      <OrderSuccessModal
        isOpen={isOrderPlaced}
        itemCount={totalCartCount}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 4-Step Interactive Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        selectedCategories={selectedVibeCategories}
        onToggleCategory={toggleVibeCategory}
        budgetLimit={budgetLimit}
        onSetBudgetLimit={(lim) => setBudgetLimit(lim)}
        hapticEnabled={hapticEnabled}
        onToggleHaptic={() => setHapticEnabled(!hapticEnabled)}
        onTriggerHaptic={triggerHaptic}
        onSelectPrimaryCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Mobile Bottom Navigation Bar & Desktop Floating Bag Button */}
      <MobileBottomNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
