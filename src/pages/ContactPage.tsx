import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Sparkles,
  Shield,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { SiteSettings } from '../types';
import { CustomerEnquiryForm } from '../components/CustomerEnquiryForm';
import { TilakLogo } from '../components/TilakLogo';

interface ContactPageProps {
  settings?: SiteSettings | null;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const rawNumber = settings?.whatsappNumber || '919382176969';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '') || '919382176969';
  const mapsUrl = settings?.mapsUrl || 'https://share.google/NJPhQEXIVloDifYAW';
  const addressText = settings?.address || 'Madpur Station Bajar';

  const faqs = [
    {
      q: 'Where is Satarupa Steel Enterprise located?',
      a: 'We are located at Madpur Station Bajar. You can visit our showroom and fabrication workshop directly or view our live location on Google Maps.',
    },
    {
      q: 'What types of stainless steel and aluminium fabrication do you provide?',
      a: 'We specialize in Grade 304/316 SS railings, decorative PVD titanium gold partition screens, slimline aluminium glazed doors/windows, gates, and modular architectural fittings.',
    },
    {
      q: 'Can mandirs and temples be built to custom room heights?',
      a: 'Yes, 100% of our shrines and mandirs are tailor-built with traditional woodwork, brass inlays, and ambient backlighting calibrated to your exact room height.',
    },
    {
      q: 'How can I discuss my project immediately?',
      a: 'You can tap the WhatsApp button or call +91 93821 76969 to share photos, room dimensions, or blueprints for immediate consultation.',
    },
  ];

  return (
    <div className="py-12 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B4632]/10 text-[#5B4632] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#C8792C]" />
            <span>Satarupa Steel Enterprise Concierge</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C221E] tracking-tight">
            Contact &amp; Custom Project Commissions
          </h1>

          <p className="text-sm sm:text-base text-[#5A4E46] leading-relaxed">
            Visit our workshop at Madpur Station Bajar, or consult with our master fabricators for stainless steel items, aluminium partitions, mandir shrines, and custom ceilings.
          </p>
        </div>

        {/* Two Column Layout: Atelier Contacts & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Concierge Direct (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Atelier Contact Card */}
            <div className="bg-[#5B4632] text-white rounded-3xl p-6 sm:p-8 border border-[#F4D9A0]/30 shadow-lg space-y-6">
              <div className="flex items-center gap-3.5">
                <TilakLogo size="md" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#F4D9A0] font-bold block mb-0.5">
                    Workshop &amp; Showroom
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                    Satarupa Steel Enterprise
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#FAF6F0]/90">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F4D9A0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Location</span>
                    <span>{addressText}</span>
                    <div className="mt-1.5">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#463525] border border-[#F4D9A0]/50 text-[#F4D9A0] text-xs font-semibold hover:bg-[#6B523B] transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#C8792C]" />
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#F4D9A0] shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">WhatsApp &amp; Phone</span>
                    <a href={`https://wa.me/${cleanNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                      {settings?.phoneNumber || '+91 93821 76969'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#F4D9A0] shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Direct Email</span>
                    <span>{settings?.email || 'satarupasteelenterprise@gmail.com'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#F4D9A0] shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Business Hours</span>
                    <span>Monday &ndash; Saturday: 9:00 AM &ndash; 8:30 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Button */}
              <div className="pt-4 border-t border-[#F4D9A0]/20 space-y-2.5">
                <a
                  href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                    'Hello Satarupa Steel Enterprise! I would like to inquire about architectural fabrication and woodwork at Madpur Station Bajar.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-wood-gold py-3.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Start WhatsApp Consultation</span>
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-gold-pill py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center shadow-md"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#241403]" />
                  <span>Navigate with Google Maps</span>
                </a>
              </div>
            </div>

            {/* Custom Process Mini-Steps */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] space-y-4">
              <h4 className="font-serif font-bold text-sm text-[#2C221E] uppercase tracking-wider">
                How Custom Commissions Work
              </h4>
              <div className="space-y-3 text-xs text-[#5A4E46]">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#5B4632] text-[#F4D9A0] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-[#2C221E]">Initial Consultation &amp; Moodboard:</strong> Send your room dimensions, ceiling heights, or reference sketches.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#5B4632] text-[#F4D9A0] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-[#2C221E]">CAD &amp; 3D Render Approval:</strong> We produce millimetric joinery drawings and material swatch previews.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#5B4632] text-[#F4D9A0] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-[#2C221E]">Precision Fabrication:</strong> Grade SS 304, aluminium thermal profiles, and seasoned woodwork crafting.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#5B4632] text-[#F4D9A0] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-[#2C221E]">White-Glove Installation:</strong> Careful delivery and on-site alignment by our certified crew.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD5] shadow-xs">
            <CustomerEnquiryForm
              settings={settings}
              titleOverride="Send Project Specifications &amp; Inquiries"
              subtitleOverride="Please provide your contact details, required furniture or architectural category, and specific sizing."
            />
          </div>
        </div>

        {/* Architectural FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B4632]/10 text-[#5B4632] text-xs font-bold tracking-wide mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#C8792C]" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C221E]">
              Custom Craftsmanship &amp; Consultation FAQs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#E8DFD5] space-y-2"
              >
                <h4 className="font-serif font-bold text-sm text-[#2C221E]">
                  {faq.q}
                </h4>
                <p className="text-xs text-[#5A4E46] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
