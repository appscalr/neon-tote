import React, { useState, useEffect } from 'react';
import {
  Search,
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
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Printer,
} from 'lucide-react';
import { StoredOrder, findOrderByNumber, getStoredOrders, generateLiveTrackingFromId } from '../utils/orderStorage';
import { generateReceiptPDF, shareToWhatsApp, printReceiptViaBrowser, OrderReceiptData } from '../utils/pdfReceipt';

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
  const [showTechnicalLogs, setShowTechnicalLogs] = useState(false);

  useEffect(() => {
    const orders = getStoredOrders();
    setRecentOrders(orders);
    if (initialOrderId) {
      setQuery(initialOrderId);
      handleTrack(initialOrderId);
    } else if (orders.length > 0) {
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
        const generated = generateLiveTrackingFromId(searchVal);
        setActiveOrder(generated);
      }
    }, 300);
  };

  const handleCopyOrderId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch (e) {
      // ignore
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
      paymentMethod: order.paymentMethod || 'Instant Verified Checkout',
      storeName: 'PIEDPOD // NEONTOTE',
      storeLocation: 'Suite 15 Cumberland Bldg, Cnr 8th & E, Bulawayo',
    };
  };

  // 4 Human-digestible progress stages
  const stages = [
    {
      id: 'verified',
      label: 'Order Verified',
      desc: 'Payment confirmed & item reserved',
      icon: ShieldCheck,
    },
    {
      id: 'sanitized',
      label: 'Sanitized & Packaged',
      desc: 'Quality checked & shock-sealed',
      icon: Sparkles,
    },
    {
      id: 'transit',
      label: 'In Transit',
      desc: 'Courier rider on route to delivery',
      icon: Truck,
    },
    {
      id: 'delivered',
      label: 'Delivered',
      desc: 'Signed and delivered to recipient',
      icon: PackageCheck,
    },
  ];

  const getStepProgress = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 4;
      case 'Out for Delivery':
        return 3;
      case 'In Transit':
        return 3;
      case 'Processing':
      default:
        return 2;
    }
  };

  const currentStep = activeOrder ? getStepProgress(activeOrder.status) : 2;

  return (
    <section id="tracking" className="px-4 lg:px-8 pb-24 lg:pb-12 pt-6">
      <div className="rounded-[24px] bg-[#141417] border border-zinc-800/90 p-5 lg:p-7 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse" />
              <h2 className="text-[17px] font-bold text-white tracking-tight">
                Live Order Tracking
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Enter your order number for real-time dispatch progress &amp; receipt downloads
            </p>
          </div>

          <span className="text-[11px] text-zinc-500 font-mono bg-[#0A0A0C] px-3 py-1 rounded-full border border-zinc-800">
            CUMBERLAND LOGISTICS HUB
          </span>
        </div>

        {/* Search Bar */}
        <div className="max-w-[560px]">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                id="tracking-query-input"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                placeholder="e.g. URBN-4829"
                className="w-full h-11 rounded-full bg-[#0A0A0C] border border-zinc-800 px-4 pr-10 text-[13px] text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-[#00FFCC] transition font-mono"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>

            <button
              id="tracking-search-btn"
              onClick={() => handleTrack()}
              disabled={isSearching}
              className="h-11 px-6 rounded-full bg-[#00FFCC] text-black text-xs font-bold tracking-wider hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-[0_0_15px_rgba(0,255,204,0.3)] disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Track</span>
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 font-mono">
              <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
            </div>
          )}

          {/* Quick Track Chips */}
          {recentOrders.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
              <span className="text-zinc-500">Recent:</span>
              {recentOrders.slice(0, 3).map((o) => (
                <button
                  key={o.orderNumber}
                  onClick={() => {
                    setQuery(o.orderNumber);
                    handleTrack(o.orderNumber);
                  }}
                  className="px-2.5 py-1 rounded-full bg-[#0A0A0C] border border-zinc-800 text-zinc-300 hover:text-[#00FFCC] hover:border-[#00FFCC]/40 transition font-mono cursor-pointer flex items-center gap-1"
                >
                  <span>{o.orderNumber}</span>
                  <span className="text-[9px] text-[#00FFCC]">({o.status})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active Order Card */}
        {activeOrder && (
          <div className="mt-6 rounded-[20px] bg-[#0C0C0E] border border-zinc-800 p-5 lg:p-6 space-y-6">
            {/* Top Order Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800">
              <div>
                <div className="text-[11px] text-zinc-400">Order Number</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[17px] font-mono font-bold text-white tracking-wide">
                    {activeOrder.orderNumber}
                  </span>
                  <button
                    onClick={() => handleCopyOrderId(activeOrder.orderNumber)}
                    className="px-2 py-0.5 rounded-md bg-[#16161B] border border-zinc-800 text-zinc-400 hover:text-white transition text-[10px] flex items-center gap-1"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3 h-3 text-[#00FFCC]" />
                        <span className="text-[#00FFCC]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status Badge & ETA */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] text-zinc-500 uppercase">Estimated Delivery</div>
                  <div className="text-xs font-bold text-zinc-200">{activeOrder.estimatedDays || '1-2 Business Days'}</div>
                </div>

                <div
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 ${
                    activeOrder.status === 'Delivered'
                      ? 'bg-[#00FFCC] text-black shadow-[0_0_12px_rgba(0,255,204,0.4)]'
                      : activeOrder.status === 'In Transit'
                      ? 'bg-[#D6FF00] text-black shadow-[0_0_12px_rgba(214,255,0,0.3)]'
                      : 'bg-[#FF00B7]/20 text-[#FF00B7] border border-[#FF00B7]/40'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{activeOrder.status.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Streamlined 4-Step Progress Bar with Status Icons */}
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
                {stages.map((stage, idx) => {
                  const stepNum = idx + 1;
                  const isDone = stepNum <= currentStep;
                  const isCurrent = stepNum === currentStep;
                  const Icon = stage.icon;

                  return (
                    <div
                      key={stage.id}
                      className={`p-3.5 rounded-[16px] border transition-all ${
                        isCurrent
                          ? 'bg-[#181820] border-[#00FFCC]/60 shadow-[0_0_16px_rgba(0,255,204,0.12)]'
                          : isDone
                          ? 'bg-[#121215] border-zinc-800'
                          : 'bg-[#0A0A0C] border-zinc-850 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-7 h-7 rounded-full grid place-items-center text-xs font-bold ${
                            isDone
                              ? 'bg-[#00FFCC] text-black'
                              : 'bg-zinc-800 text-zinc-500'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : stepNum}
                        </div>

                        <Icon
                          className={`w-4 h-4 ${
                            isCurrent
                              ? 'text-[#00FFCC]'
                              : isDone
                              ? 'text-zinc-400'
                              : 'text-zinc-600'
                          }`}
                        />
                      </div>

                      <div className="font-bold text-xs text-zinc-100">{stage.label}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{stage.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Digestible Summary Info: Items & Destination */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Package contents */}
              <div className="p-4 rounded-[16px] bg-[#121215] border border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-[#00FFCC]" /> Package Contents
                  </span>
                  <span className="text-zinc-500 font-mono">
                    {activeOrder.items?.length || 1} items
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {activeOrder.items && activeOrder.items.length > 0 ? (
                    activeOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-8 h-8 rounded-lg object-cover bg-zinc-900 shrink-0 border border-zinc-800"
                          />
                          <span className="text-zinc-200 truncate font-medium">
                            {item.product.name}
                          </span>
                        </div>
                        <span className="text-zinc-400 font-mono shrink-0 ml-2">
                          x{item.qty} (${(item.product.price * item.qty).toFixed(2)})
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-zinc-400">Curated PIEDPOD Drop</div>
                  )}
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex justify-between text-xs font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-[#00FFCC] font-mono">${activeOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Hub & Guarantee */}
              <div className="p-4 rounded-[16px] bg-[#121215] border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FF00B7]" /> Dispatch Hub &amp; Guarantee
                  </div>

                  <div className="text-xs text-zinc-400 space-y-1">
                    <div>
                      <strong className="text-zinc-200">Origin:</strong> Suite 15 Cumberland Fulfillment, Bulawayo
                    </div>
                    <div>
                      <strong className="text-zinc-200">Recipient:</strong> {activeOrder.customerEmail || 'Collector'}
                    </div>
                    <div>
                      <strong className="text-zinc-200">Courier:</strong> Metro Express Riders
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-[#00FFCC] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 14-Day Warranty Included
                  </span>
                  <span className="text-zinc-500 font-mono">{activeOrder.date}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions (PDF, Print, WhatsApp) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => generateReceiptPDF(getReceiptData(activeOrder))}
                  className="h-9 px-4 rounded-full bg-[#181820] border border-[#00FFCC]/40 text-[#00FFCC] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#00FFCC]/10 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF Receipt
                </button>

                <button
                  onClick={() => printReceiptViaBrowser(getReceiptData(activeOrder))}
                  className="h-9 px-4 rounded-full bg-[#181820] border border-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 hover:text-white hover:border-zinc-500 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>

                <button
                  onClick={() => shareToWhatsApp(getReceiptData(activeOrder), activeOrder.customerPhone)}
                  className="h-9 px-4 rounded-full bg-[#25D366] text-black text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(37,211,102,0.3)] hover:brightness-110 transition cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-black" /> Share WhatsApp
                </button>
              </div>

              {/* Collapsible Toggle for Deep Technical Checkpoints */}
              <button
                onClick={() => setShowTechnicalLogs(!showTechnicalLogs)}
                className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 cursor-pointer transition py-1"
              >
                <span>{showTechnicalLogs ? 'Hide Detailed Timestamps' : 'View Detailed Checkpoints'}</span>
                {showTechnicalLogs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Collapsible Detailed Dispatch Logs (Kept for completeness without cluttering main view) */}
            {showTechnicalLogs && (
              <div className="pt-4 border-t border-zinc-800/80 space-y-2.5 animate-in">
                <div className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase mb-2">
                  Dispatch Milestone Checkpoints
                </div>
                {activeOrder.events.map((event, idx) => (
                  <div key={idx} className="flex gap-3 text-xs bg-[#111114] p-2.5 rounded-[12px] border border-zinc-850">
                    <div className="w-2 h-2 rounded-full bg-[#00FFCC] mt-1 shrink-0 shadow-[0_0_6px_#00FFCC]" />
                    <div className="flex-1">
                      <div className="font-semibold text-zinc-200">{event.description}</div>
                      <div className="text-[10px] text-zinc-500 flex items-center gap-2 mt-0.5">
                        <span className="text-[#D6FF00]">{event.time}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
