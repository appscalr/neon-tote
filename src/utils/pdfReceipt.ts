import { jsPDF } from 'jspdf';
import { CartItem } from '../types';

export interface OrderReceiptData {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customerEmail?: string;
  customerPhone?: string;
  customerName?: string;
  paymentMethod?: string;
  storeName?: string;
  storeLocation?: string;
  storeContact?: string;
}

export function formatWhatsAppMessage(order: OrderReceiptData): string {
  const store = order.storeName || 'PIEDPOD // NEONTOTE';
  const divider = '━━━━━━━━━━━━━━━━━━━━━━';
  
  let msg = `🛍️ *${store}*\n`;
  msg += `🧾 *OFFICIAL ORDER RECEIPT*\n`;
  msg += `${divider}\n`;
  msg += `🔖 *Order No:* #${order.orderNumber}\n`;
  msg += `📅 *Date:* ${order.date}\n`;
  if (order.customerName) msg += `👤 *Customer:* ${order.customerName}\n`;
  if (order.customerEmail) msg += `📧 *Email:* ${order.customerEmail}\n`;
  if (order.customerPhone) msg += `📱 *Phone:* ${order.customerPhone}\n`;
  msg += `💳 *Payment:* ${order.paymentMethod || 'Apple Pay / Verified'}\n`;
  msg += `📍 *Fulfillment Hub:* Suite 15 Cumberland Bldg, Cnr 8th & E, Bulawayo\n`;
  msg += `${divider}\n`;
  msg += `📦 *ITEMS ORDERED:*\n`;

  order.items.forEach((item, index) => {
    const itemTotal = (item.product.price * item.qty).toFixed(2);
    msg += `${index + 1}. *${item.product.name}*\n`;
    msg += `   └ Qty: ${item.qty} × $${item.product.price.toFixed(2)} = *$${itemTotal}*\n`;
  });

  msg += `${divider}\n`;
  msg += `💵 *Subtotal:* $${order.subtotal.toFixed(2)}\n`;
  msg += `🚚 *Shipping:* ${order.shippingFee === 0 ? 'FREE ($0.00)' : `$${order.shippingFee.toFixed(2)}`}\n`;
  msg += `🔥 *TOTAL PAID:* *$${order.total.toFixed(2)}*\n`;
  msg += `${divider}\n`;
  msg += `⚡ *Support:* shop@piedpod.online • @piedpod_store\n`;
  msg += `🌐 *Track Order:* https://piedpod.online/tracking?id=${order.orderNumber}\n`;
  msg += `_Thank you for supporting curated cyber & neo-brutalist tech drops!_`;

  return msg;
}

export function shareToWhatsApp(order: OrderReceiptData, customPhone?: string): void {
  const message = formatWhatsAppMessage(order);
  const encodedText = encodeURIComponent(message);
  
  let url = `https://api.whatsapp.com/send?text=${encodedText}`;
  if (customPhone && customPhone.trim()) {
    const cleanPhone = customPhone.replace(/[^0-9]/g, '');
    if (cleanPhone) {
      url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
    }
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

export function generateReceiptPDF(order: OrderReceiptData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Background Theme
  doc.setFillColor(15, 15, 18);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative Neon Gradient Border Box
  doc.setDrawColor(0, 255, 204);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin - 4, margin - 4, contentWidth + 8, 275, 4, 4, 'S');

  // Top Neon Accent Bar
  doc.setFillColor(0, 255, 204);
  doc.rect(margin - 4, margin - 4, (contentWidth + 8) / 2, 2.5, 'F');
  doc.setFillColor(255, 0, 183);
  doc.rect(margin - 4 + (contentWidth + 8) / 2, margin - 4, (contentWidth + 8) / 2, 2.5, 'F');

  let y = margin + 10;

  // Brand Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(0, 255, 204);
  doc.text('PIEDPOD // NEONTOTE', margin, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 0, 183);
  doc.text('OFFICIAL DROP RECEIPT', pageWidth - margin, y, { align: 'right' });

  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(170, 170, 180);
  doc.text('Curated Tech Thrift & Cyber Streetwear Drops', margin, y);
  doc.text(`RECEIPT #: ${order.orderNumber}`, pageWidth - margin, y, { align: 'right' });

  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 140);
  doc.text('Suite 15 Cumberland Bldg • Cnr 8th & E • Bulawayo', margin, y);
  doc.text(`DATE: ${order.date}`, pageWidth - margin, y, { align: 'right' });

  y += 8;
  // Divider
  doc.setDrawColor(40, 40, 50);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);

  y += 8;

  // Order & Customer Info Grid
  doc.setFillColor(24, 24, 30);
  doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'F');
  doc.setDrawColor(50, 50, 65);
  doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(0, 255, 204);
  doc.text('CUSTOMER & PAYMENT DETAILS', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(220, 220, 230);
  
  const custName = order.customerName || 'Verified Guest';
  const custEmail = order.customerEmail || 'shop@piedpod.online';
  const payMethod = order.paymentMethod || 'Apple Pay / 1-Tap Haptic';

  doc.text(`Customer: ${custName}`, margin + 4, y + 13);
  doc.text(`Email: ${custEmail}`, margin + 4, y + 19);

  doc.text(`Payment: ${payMethod}`, margin + contentWidth / 2, y + 13);
  doc.text(`Status: Verified & Paid (Shock-Proof Pack)`, margin + contentWidth / 2, y + 19);

  y += 34;

  // Table Header
  doc.setFillColor(32, 32, 40);
  doc.roundedRect(margin, y, contentWidth, 8, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(0, 255, 204);
  doc.text('#', margin + 3, y + 5.5);
  doc.text('ITEM DESCRIPTION', margin + 12, y + 5.5);
  doc.text('CATEGORY', margin + 95, y + 5.5);
  doc.text('QTY', margin + 130, y + 5.5, { align: 'center' });
  doc.text('UNIT PRICE', margin + 150, y + 5.5, { align: 'right' });
  doc.text('AMOUNT', pageWidth - margin - 4, y + 5.5, { align: 'right' });

  y += 11;

  // Table Rows
  order.items.forEach((item, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(20, 20, 26);
      doc.rect(margin, y - 4, contentWidth, 8, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(230, 230, 240);

    // Number
    doc.setTextColor(140, 140, 150);
    doc.text(String(idx + 1).padStart(2, '0'), margin + 3, y + 1.5);

    // Name
    doc.setTextColor(240, 240, 255);
    doc.setFont('helvetica', 'bold');
    const truncatedName = item.product.name.length > 40 ? item.product.name.substring(0, 38) + '...' : item.product.name;
    doc.text(truncatedName, margin + 12, y + 1.5);

    // Category
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(160, 160, 175);
    doc.text(item.product.category || 'GEAR', margin + 95, y + 1.5);

    // Qty
    doc.setTextColor(230, 230, 240);
    doc.text(String(item.qty), margin + 130, y + 1.5, { align: 'center' });

    // Unit Price
    doc.text(`$${item.product.price.toFixed(2)}`, margin + 150, y + 1.5, { align: 'right' });

    // Amount
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 255, 204);
    doc.text(`$${(item.product.price * item.qty).toFixed(2)}`, pageWidth - margin - 4, y + 1.5, { align: 'right' });

    y += 9;
  });

  // Table Bottom Divider
  doc.setDrawColor(50, 50, 65);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Summary Totals Area
  const summaryX = pageWidth - margin - 85;
  doc.setFillColor(22, 22, 28);
  doc.roundedRect(summaryX - 4, y - 2, 89, 36, 3, 3, 'F');
  doc.setDrawColor(60, 60, 75);
  doc.roundedRect(summaryX - 4, y - 2, 89, 36, 3, 3, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(170, 170, 180);
  doc.text('Subtotal:', summaryX, y + 5);
  doc.setTextColor(240, 240, 255);
  doc.text(`$${order.subtotal.toFixed(2)}`, pageWidth - margin - 2, y + 5, { align: 'right' });

  doc.setTextColor(170, 170, 180);
  doc.text('Shipping & Handling:', summaryX, y + 12);
  doc.setTextColor(order.shippingFee === 0 ? 0 : 240, order.shippingFee === 0 ? 255 : 240, order.shippingFee === 0 ? 204 : 255);
  doc.text(order.shippingFee === 0 ? 'FREE ($0.00)' : `$${order.shippingFee.toFixed(2)}`, pageWidth - margin - 2, y + 12, { align: 'right' });

  doc.setDrawColor(60, 60, 75);
  doc.line(summaryX, y + 17, pageWidth - margin, y + 17);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 0, 183);
  doc.text('TOTAL AMOUNT:', summaryX, y + 26);
  doc.setTextColor(0, 255, 204);
  doc.text(`$${order.total.toFixed(2)}`, pageWidth - margin - 2, y + 26, { align: 'right' });

  // Verification Barcode & Terms
  const bottomY = 245;

  // Fake Barcode Lines
  doc.setDrawColor(180, 180, 200);
  let barcodeX = margin;
  const barcodeWidths = [1.2, 0.4, 0.8, 1.6, 0.4, 1.2, 0.6, 2.0, 0.4, 1.0, 1.4, 0.5, 0.8, 1.8, 0.4, 1.2, 0.8, 1.5, 0.6, 1.2, 0.4, 1.0, 1.6, 0.5, 0.9, 1.4, 0.4, 1.2, 0.7, 1.8, 0.4, 1.0];
  for (let i = 0; i < barcodeWidths.length; i++) {
    doc.setLineWidth(barcodeWidths[i]);
    doc.line(barcodeX, bottomY, barcodeX, bottomY + 12);
    barcodeX += barcodeWidths[i] + 0.8;
  }

  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(140, 140, 150);
  doc.text(`SECURE_HASH: *${order.orderNumber}-NEON-AUTH-OK*`, margin, bottomY + 17);

  // Guarantee & Footer note
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 0, 183);
  doc.text('14-DAY QUALITY RETURN & THRIFT DISPATCH WARRANTY', margin, bottomY + 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 130);
  doc.text('Dispatched via Cumberland Fulfillment Logistics • Support: shop@piedpod.online • @piedpod_store', margin, bottomY + 29);
  doc.text('Visit https://piedpod.online for live order tracking & dispatch logs.', margin, bottomY + 33);

  // Save the PDF
  doc.save(`PiedPod_Receipt_${order.orderNumber}.pdf`);
}

export function printReceiptViaBrowser(order: OrderReceiptData): void {
  const store = order.storeName || 'PIEDPOD // NEONTOTE';
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print your receipt');
    return;
  }

  const itemsHtml = order.items
    .map(
      (item, idx) => `
      <tr style="border-bottom: 1px solid #27272a;">
        <td style="padding: 10px 8px; font-family: monospace; color: #a1a1aa;">${String(idx + 1).padStart(2, '0')}</td>
        <td style="padding: 10px 8px;">
          <strong style="color: #ffffff; font-size: 13px;">${item.product.name}</strong>
          <div style="font-size: 11px; color: #71717a; margin-top: 2px;">${item.product.category} • $${item.product.price.toFixed(2)} each</div>
        </td>
        <td style="padding: 10px 8px; text-align: center; color: #ffffff; font-weight: bold;">${item.qty}</td>
        <td style="padding: 10px 8px; text-align: right; color: #00FFCC; font-weight: bold; font-family: monospace;">$${(item.product.price * item.qty).toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>PiedPod Receipt - ${order.orderNumber}</title>
        <meta charset="utf-8" />
        <style>
          @page {
            size: A4;
            margin: 12mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: #09090b;
            color: #f4f4f5;
            padding: 24px;
            font-size: 13px;
            line-height: 1.5;
          }
          .receipt-box {
            max-width: 680px;
            margin: 0 auto;
            background: #121215;
            border: 2px solid #00FFCC;
            border-radius: 16px;
            padding: 28px;
            box-shadow: 0 0 30px rgba(0,255,204,0.2);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid #27272a;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .brand-title {
            font-size: 24px;
            font-weight: 900;
            color: #00FFCC;
            letter-spacing: 0.05em;
          }
          .badge {
            background: #FF00B7;
            color: #ffffff;
            font-weight: bold;
            font-size: 10px;
            padding: 4px 10px;
            border-radius: 999px;
            letter-spacing: 0.1em;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            background: #18181b;
            border: 1px solid #27272a;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 24px;
          }
          .info-item label {
            display: block;
            font-size: 10px;
            color: #00FFCC;
            font-weight: bold;
            letter-spacing: 0.05em;
            margin-bottom: 4px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          th {
            background: #1f1f23;
            color: #00FFCC;
            text-align: left;
            padding: 10px 8px;
            font-size: 11px;
            letter-spacing: 0.05em;
          }
          .totals-wrap {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 24px;
          }
          .totals-table {
            width: 260px;
            background: #18181b;
            border: 1px solid #27272a;
            border-radius: 12px;
            padding: 14px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            color: #a1a1aa;
            font-size: 12px;
          }
          .total-row.final {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #3f3f46;
            color: #ffffff;
            font-size: 16px;
            font-weight: bold;
          }
          .footer {
            border-top: 1px solid #27272a;
            padding-top: 16px;
            text-align: center;
            font-size: 11px;
            color: #71717a;
          }
          @media print {
            body {
              background: #ffffff;
              color: #000000;
              padding: 0;
            }
            .receipt-box {
              border: 1px solid #000000;
              box-shadow: none;
              background: #ffffff;
            }
            .brand-title {
              color: #000000;
            }
            .badge {
              background: #000000;
              color: #ffffff;
            }
            .info-grid, .totals-table {
              background: #f4f4f5;
              border-color: #e4e4e7;
              color: #000000;
            }
            .info-item label, th {
              color: #000000;
              background: #e4e4e7;
            }
            .total-row.final span:last-child, td:last-child {
              color: #000000 !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-box">
          <div class="header">
            <div>
              <div class="brand-title">${store}</div>
              <div style="color: #a1a1aa; font-size: 11px; margin-top: 4px;">Suite 15 Cumberland Bldg • Cnr 8th & E • Bulawayo</div>
              <div style="color: #a1a1aa; font-size: 11px;">shop@piedpod.online • @piedpod_store</div>
            </div>
            <div style="text-align: right;">
              <span class="badge">OFFICIAL RECEIPT</span>
              <div style="font-weight: bold; font-size: 13px; color: #00FFCC; margin-top: 8px; font-family: monospace;">#${order.orderNumber}</div>
              <div style="font-size: 11px; color: #a1a1aa; margin-top: 2px;">${order.date}</div>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <label>CUSTOMER DETAILS</label>
              <div><strong>${order.customerName || 'Verified Customer'}</strong></div>
              <div style="color: #a1a1aa; font-size: 11px;">${order.customerEmail || 'shop@piedpod.online'}</div>
              ${order.customerPhone ? `<div style="color: #a1a1aa; font-size: 11px;">${order.customerPhone}</div>` : ''}
            </div>
            <div class="info-item">
              <label>PAYMENT & STATUS</label>
              <div><strong>${order.paymentMethod || 'Apple Pay / Instant Checkout'}</strong></div>
              <div style="color: #00FFCC; font-size: 11px; font-weight: bold;">Status: Dispatched & Verified ✓</div>
              <div style="color: #a1a1aa; font-size: 11px;">Fulfillment: Cumberland Hub</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 30px;">#</th>
                <th>ITEM</th>
                <th style="text-align: center; width: 60px;">QTY</th>
                <th style="text-align: right; width: 90px;">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="totals-wrap">
            <div class="totals-table">
              <div class="total-row">
                <span>Subtotal</span>
                <span>$${order.subtotal.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Shipping</span>
                <span>${order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee.toFixed(2)}`}</span>
              </div>
              <div class="total-row final">
                <span>Total</span>
                <span style="color: #00FFCC;">$${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div class="footer">
            <div style="font-weight: bold; color: #FF00B7; margin-bottom: 4px;">14-DAY QUALITY GUARANTEE • PIEDPOD SECURE DISPATCH</div>
            <div>Track your package online anytime at <strong>https://piedpod.online/tracking</strong></div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
