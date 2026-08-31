import React, { useState, useEffect } from 'react';
import {
  Search,
  Zap,
  Truck,
  Box,
  MapPin,
  Download,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  PackageCheck,
  RefreshCw,
  Eye,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { TrackingLog, CartItem } from '../types';
import { generateReceiptPDF, shareToWhatsApp, OrderReceiptData, printReceiptViaBrowser } from '../utils/pdfReceipt';
import { findOrderByNumber, getStoredOrders, StoredOrder, generateLiveTrackingFromId } from '../utils/orderStorage';

interface OrderTrackingSectionProps {
  initialOrderId?: string;
}

export const OrderTrackingSection: React.FC<OrderTrackingSectionProps> = ({ initialOrderId }) => {
  const [query, setQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<StoredOrder | null>(null);
  const [recentOrders, setRecentOrders] = useState<StoredOrder[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'items' | 'contact'>('timeline');

  // Load recent orders on mount
  useEffect(() => {
    const orders = getStoredOrders();
    setRecentOrders(orders);
    if (initialOrderId) {
      setQuery(initialOrderId);
      handleTrack(initialOrderId);
    } else if (orders.length > 0) {
      // Default to first active order
      setActiveOrder(orders[0]);
      setQuery(orders[0].orderNumber);
    }
  }, [initialOrderId]);

  const handleTrack = (idToSearch?: string) => {
    const rawVal = idToSearch !== undefined ? idToSearch : query;
    const searchVal = rawVal.trim();
    setErrorMsg(null);

    if (!searchVal) {
      setErrorMsg('Please enter an Order ID or Tracking Number');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const found = findOrderByNumber(searchVal);
      if (found) {
        setActiveOrder(found);
      } else {
        // Generate a verified live fallback log for any simulated drop query
        const generated = generateLiveTrackingFromId(searchVal);
        setActiveOrder(generated);
      }
    }, 350);
  };

  const handleCopyOrderId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch (e) {
      // fallback
    }
  };

  const getReceiptData = (order: StoredOrder): OrderReceiptData => {
    return {
      orderNumber: order.orderNumber,
      date: order.date,
      items: order.items || [],
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      total: order.total,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      paymentMethod: order.paymentMethod || 'Verified Instant Checkout',
      storeName: 'PIEDPOD // NEONTOTE',
      storeLocation: 'Suite 15 Cumberland Bldg, Cnr 8th & E, Bulawayo',
    };
  };

  const handleDownloadPDF = () => {
    if (!activeOrder) return;
    generateReceiptPDF(getReceiptData(activeOrder));
  };

  const handleShareWhatsApp = () => {
    if (!activeOrder) return;
    shareToWhatsApp(getReceiptData(activeOrder), activeOrder.customerPhone);
  };

  const handlePrint = () => {
    if (!activeOrder) return;
    printReceiptViaBrowser(getReceiptData(activeOrder));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return {
          bg: 'bg-[#00FFCC] text-black border-[#00FFCC]',
          glow: 'shadow-[0_0_12px_rgba(0,255,204,0.4)]',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          label: 'DELIVERED',
        };
      case 'Out for Delivery':
        return {
          bg: 'bg-[#D6FF00] text-black border-[#D6FF00]',
          glow: 'shadow-[0_0_12px_rgba(214,255,0,0.4)]',
          icon: <Truck className="w-3.5 h-3.5" />,
          label: 'OUT FOR DELIVERY',
        };
      case 'In Transit':
        return {
          bg: 'bg-[#00FFCC]/20 text-[#00FFCC] border-[#00FFCC]/50',
          glow: 'shadow-[0_0_12px_rgba(0,255,204,0.2)]',
          icon: <Truck className="w-3.5 h-3.5 text-[#00FFCC]" />,
          label: 'IN TRANSIT',
        };
      case 'Processing':
      default:
        return {
          bg: 'bg-[#FF00B7]/20 text-[#FF00B7] border-[#FF00B7]/50',
          glow: 'shadow-[0_0_12px_rgba(255,0,183,0.2)]',
          icon: <RefreshCw className="w-3.5 h-3.5 animate-spin" />,
          label: 'PROCESSING DROP',
        };
    }
  };

  // 4 Standard Step Progression definition
  const progressSteps = [
    { label: 'Order Verified', sub: 'Vault Auth' },
    { label: 'Grade & Sanitize', sub: 'UV Chamber' },
    { label: 'In Transit', sub: 'Metro Courier' },
    { label: 'Delivered', sub: 'Shock Seal' },
  ];

  const getActiveStepIndex = (status?: string) => {
    if (!status) return 1;
    if (status === 'Delivered') return 4;
    if (status === 'Out for Delivery') return 3;
    if (status === 'In Transit') return 2;
    return 1;
  };

  const activeStepIdx = activeOrder ? getActiveStepIndex(activeOrder.status) : 0;

  return (
    <section id="tracking" className="px-4 lg:px-8 pb-28 lg:pb-12 pt-6">
      <div className="rounded-[24px] bg-[#161616] border border-zinc-800 p-5 lg:p-7 flex flex-col lg:flex-row gap-6">
        {/* Left Tracking Search and Live Log Container */}
        <div className="flex-1 space-y-6">
          {/* Terminal Title Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-zinc-400 font-semibold">
              <Zap className="w-4 h-4 text-[#FF00B7]" /> TRACK_ORDER.exe
              <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse ml-1" />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">
              BULAWAYO LOGISTICS HUB // SECURE DISPATCH
            </span>
          </div>

          {/* Search Input Bar */}
          <div>
            <div className="flex gap-2 max-w-[560px]">
              <div className="flex-1 relative">
                <input
                  id="tracking-query-input"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                  placeholder="URBN-XXXX-XXXX-XXXX"
                  className="w-full h-11 rounded-full bg-[#0A0A0A] border border-zinc-800 px-4 pr-10 text-[12px] tracking-widest text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-[#FF00B7] transition font-mono"
                />
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>

              <button
                id="tracking-search-btn"
                onClick={() => handleTrack()}
                disabled={isSearching}
                className="h-11 px-6 rounded-full bg-[#FF00B7] text-white text-[11px] font-bold tracking-widest shadow-[0_0_20px_#FF00B7] hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    SEARCHING...
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    SEARCH
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <div className="mt-2 text-[11px] text-rose-400 flex items-center gap-1.5 font-mono">
                <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
              </div>
            )}

            {/* Quick Suggestions & Recent IDs */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-zinc-400">
              <span className="text-zinc-500">Quick Track:</span>
              {recentOrders.slice(0, 3).map((o) => (
                <button
                  key={o.orderNumber}
                  onClick={() => {
                    setQuery(o.orderNumber);
                    handleTrack(o.orderNumber);
                  }}
                  className="px-2.5 py-1 rounded-full bg-[#0A0A0A] border border-zinc-800 text-[#00FFCC] hover:border-[#00FFCC] hover:bg-[#00FFCC]/10 transition font-mono cursor-pointer flex items-center gap-1"
                >
                  <span>{o.orderNumber}</span>
                  <span className="text-[9px] text-zinc-500">({o.status})</span>
                </button>
              ))}
              <span className="text-zinc-600 hidden sm:inline">• Free dispatch over $50 • 14d warranty</span>
            </div>
          </div>

          {/* Active Tracking Result Panel */}
          {activeOrder && (
            <div className="rounded-[22px] bg-[#0A0A0A] border border-[#00FFCC]/40 p-5 lg:p-6 shadow-[0_0_25px_rgba(0,255,204,0.12)] animate-in">
              {/* Top Order Status Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                <div>
                  <div className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                    DISPATCH TRACKING ID
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[15px] font-black text-[#00FFCC] tracking-wider font-mono">
                      {activeOrder.orderNumber}
                    </span>
                    <button
                      onClick={() => handleCopyOrderId(activeOrder.orderNumber)}
                      title="Copy Tracking ID"
                      className="p-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#00FFCC] transition text-[10px] flex items-center gap-1 px-1.5"
                    >
                      {copiedId ? (
                        <>
                          <Check className="w-3 h-3 text-[#00FFCC]" />
                          <span className="text-[#00FFCC] text-[9px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[9px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Status Badge */}
                {(() => {
                  const badge = getStatusBadge(activeOrder.status);
                  return (
                    <div
                      className={`px-3.5 py-1.5 rounded-full border text-[11px] font-black tracking-widest flex items-center gap-1.5 ${badge.bg} ${badge.glow}`}
                    >
                      {badge.icon}
                      {badge.label}
                    </div>
                  );
                })()}
              </div>

              {/* Progress Step Bar */}
              <div className="my-5 bg-[#121215] border border-zinc-800/80 rounded-[18px] p-4">
                <div className="grid grid-cols-4 gap-2 relative">
                  {/* Connecting Track Line */}
                  <div className="absolute top-3.5 left-[12%] right-[12%] h-[2px] bg-zinc-800 -z-0">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF00B7] via-[#00FFCC] to-[#D6FF00] transition-all duration-700"
                      style={{
                        width: `${Math.min(100, ((activeStepIdx - 1) / 3) * 100)}%`,
                      }}
                    />
                  </div>

                  {progressSteps.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isDone = stepNum <= activeStepIdx;
                    const isCurrent = stepNum === activeStepIdx;

                    return (
                      <div key={idx} className="flex flex-col items-center text-center z-10">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                            isDone
                              ? 'bg-[#00FFCC] text-black border-[#00FFCC] shadow-[0_0_10px_#00FFCC]'
                              : isCurrent
                              ? 'bg-[#FF00B7] text-white border-[#FF00B7] animate-pulse shadow-[0_0_10px_#FF00B7]'
                              : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepNum}
                        </div>
                        <div className="mt-2 font-bold text-[11px] text-zinc-200">{step.label}</div>
                        <div className="text-[9px] text-zinc-500 hidden sm:block">{step.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Metadata Quick Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#111114] border border-zinc-800 rounded-[16px] p-3 text-[11px]">
                <div>
                  <span className="text-zinc-500 text-[10px] block">ESTIMATED ETA</span>
                  <strong className="text-white">{activeOrder.estimatedDays || '1-2 Days'}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">DISPATCH HUB</span>
                  <strong className="text-zinc-200">Cumberland Hub</strong>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">ORDER DATE</span>
                  <strong className="text-zinc-200">{activeOrder.date}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">TOTAL VALUE</span>
                  <strong className="text-[#00FFCC] font-mono">${activeOrder.total.toFixed(2)}</strong>
                </div>
              </div>

              {/* View Tabs */}
              <div className="flex border-b border-zinc-800 mt-5 text-[11px] font-bold">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'timeline'
                      ? 'border-[#00FFCC] text-[#00FFCC]'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" /> Tracking Timeline ({activeOrder.events.length})
                </button>
                <button
                  onClick={() => setActiveTab('items')}
                  className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'items'
                      ? 'border-[#00FFCC] text-[#00FFCC]'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" /> Package Items ({activeOrder.items?.length || 1})
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'contact'
                      ? 'border-[#00FFCC] text-[#00FFCC]'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Recipient &amp; Hub
                </button>
              </div>

              {/* Tab 1: Detailed Event Timeline */}
              {activeTab === 'timeline' && (
                <div className="space-y-3 pt-4">
                  {activeOrder.events.map((event, idx) => (
                    <div key={idx} className="flex gap-3 text-[11px] group">
                      <div className="w-5 flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full border-2 transition ${
                            idx === 0
                              ? 'bg-[#00FFCC] border-[#00FFCC] shadow-[0_0_10px_#00FFCC]'
                              : 'bg-[#18181b] border-zinc-700'
                          }`}
                        />
                        {idx !== activeOrder.events.length - 1 && (
                          <div className="w-0.5 flex-1 bg-zinc-800 my-1 group-hover:bg-zinc-700 transition" />
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="font-bold text-zinc-100 text-[12px]">{event.description}</div>
                        <div className="text-[10px] text-zinc-500 flex items-center gap-2 mt-0.5">
                          <span className="text-[#D6FF00]">{event.time}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-zinc-400">
                            <MapPin className="w-3 h-3 text-[#FF00B7]" /> {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Packaged Items */}
              {activeTab === 'items' && (
                <div className="pt-4 space-y-2">
                  {activeOrder.items && activeOrder.items.length > 0 ? (
                    activeOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-[14px] bg-[#121215] border border-zinc-800"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-black border border-zinc-800 overflow-hidden shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-zinc-100 text-[12px]">{item.product.name}</div>
                            <div className="text-[10px] text-zinc-500">
                              Qty: {item.qty} • {item.product.category}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#00FFCC] font-mono text-[12px]">
                            ${(item.product.price * item.qty).toFixed(2)}
                          </div>
                          <div className="text-[9px] text-zinc-500">Shock Sealed</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-zinc-400 text-[11px] p-3 bg-[#121215] rounded-[14px]">
                      PIEDPOD Curated Cyber Drop
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Recipient & Guarantee */}
              {activeTab === 'contact' && (
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 bg-[#121215] border border-zinc-800 rounded-[14px]">
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold mb-1">
                      CUSTOMER CONTACT
                    </div>
                    <div className="font-bold text-white">{activeOrder.customerEmail || 'Verified Collector'}</div>
                    <div className="text-zinc-400 mt-1">{activeOrder.customerPhone || '+263 77 (Metro Courier)'}</div>
                    <div className="text-[10px] text-zinc-500 mt-2">
                      Payment: {activeOrder.paymentMethod || 'Apple Pay / Instant'}
                    </div>
                  </div>

                  <div className="p-3 bg-[#121215] border border-zinc-800 rounded-[14px]">
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold mb-1">
                      FULFILLMENT GUARANTEE
                    </div>
                    <div className="text-[#00FFCC] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 14-Day Quality Guarantee
                    </div>
                    <div className="text-zinc-400 mt-1">Suite 15 Cumberland Bldg, Bulawayo</div>
                    <div className="text-[10px] text-zinc-500 mt-2">
                      Live Support: shop@piedpod.online
                    </div>
                  </div>
                </div>
              )}

              {/* Receipt & WhatsApp Action Row */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="h-9 px-4 rounded-full bg-[#18181f] border border-[#00FFCC]/40 text-[#00FFCC] text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#00FFCC]/10 active:scale-95 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF Receipt
                  </button>

                  <button
                    onClick={handlePrint}
                    className="h-9 px-4 rounded-full bg-[#18181f] border border-zinc-700 text-zinc-300 text-[11px] font-bold flex items-center gap-1.5 hover:border-zinc-500 active:scale-95 transition cursor-pointer"
                  >
                    Print
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="h-9 px-4 rounded-full bg-[#25D366] text-black text-[11px] font-black flex items-center gap-1.5 shadow-[0_0_12px_rgba(37,211,102,0.3)] hover:brightness-110 active:scale-95 transition cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-black" /> Share WhatsApp
                  </button>
                </div>

                <div className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3 text-[#D6FF00]" /> Verified Dispatch Log
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Info & Live Dispatch Stats Card */}
        <div className="lg:w-[320px] rounded-[20px] bg-[#0A0A0A] border border-zinc-800 p-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-[10px] tracking-widest text-zinc-500 mb-3 font-semibold">
              <span>FULFILLMENT_NODE // 01</span>
              <span className="w-2 h-2 rounded-full bg-[#00FFCC]" />
            </div>

            <div className="p-3.5 rounded-[16px] bg-[#141418] border border-zinc-800 space-y-2">
              <div className="text-[12px] font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00FFCC]" /> Cumberland Logistics Hub
              </div>
              <div className="text-[11px] leading-5 text-zinc-400">
                Suite 15 Cumberland Bldg
                <br />
                Cnr 8th Ave &amp; E Ave, Bulawayo
              </div>
            </div>

            {/* Live Station Telemetry */}
            <div className="mt-4 space-y-2.5 text-[11px]">
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-500">Dispatch Speed</span>
                <span className="text-[#00FFCC] font-bold">Same-Day Local</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-500">Packaging</span>
                <span className="text-zinc-200">Shock-Proof UV Seal</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-500">Courier Network</span>
                <span className="text-zinc-200">Metro Express Riders</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">Official Channel</span>
                <span className="text-[#FF00B7] font-mono font-bold">@piedpod_store</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-2">
            <div className="flex gap-2">
              <span className="text-[9px] px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                SECURE • HAPTIC
              </span>
              <span className="text-[9px] px-2.5 py-1 rounded-full bg-[#00FFCC]/10 border border-[#00FFCC]/20 text-[#00FFCC]">
                NEON VERIFIED
              </span>
            </div>
            <div className="text-[10px] text-zinc-500">
              Direct inquiries:{' '}
              <a href="mailto:shop@piedpod.online" className="text-[#00FFCC] underline">
                shop@piedpod.online
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
