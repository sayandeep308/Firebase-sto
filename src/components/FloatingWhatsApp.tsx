import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SiteSettings } from '../types';

interface FloatingWhatsAppProps {
  settings?: SiteSettings | null;
  productTitle?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings, productTitle }) => {
  const rawNumber = settings?.whatsappNumber || '919382176969';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '') || '919382176969';

  const textMessage = productTitle
    ? `Hello Satarupa Steel Enterprise! I would like to inquire about "${productTitle}". Please share pricing and bespoke customization details.`
    : `Hello Satarupa Steel Enterprise! I would like to inquire about your stainless steel items, aluminium fabrication, and interior designs at Madpur Station Bajar.`;

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(textMessage)}`;

  return (
    <aside aria-label="Customer Support Floating Action">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Satarupa Steel Enterprise on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-3 rounded-full shadow-2xl transition-transform duration-300 hover:scale-105 whatsapp-pulse group"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white shrink-0 group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline font-semibold text-sm tracking-wide">
          Inquire on WhatsApp
        </span>
      </a>
    </aside>
  );
};
