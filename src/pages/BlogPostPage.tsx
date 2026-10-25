import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Tag,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { BlogPost, SiteSettings, Product } from '../types';

interface BlogPostPageProps {
  post: BlogPost;
  recentPosts: BlogPost[];
  settings?: SiteSettings | null;
  onNavigate: (path: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  recentPosts,
  settings,
  onNavigate,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const rawNumber = settings?.whatsappNumber || '919382176969';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '') || '919382176969';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const otherPosts = recentPosts.filter((p) => p.id !== post.id && p.isPublished).slice(0, 2);

  return (
    <article className="py-12 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B4632] hover:text-[#C8792C] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Craft Journal Articles</span>
        </button>

        {/* Article Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD5] shadow-xs space-y-6">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-[#5A4E46]">
              <span className="flex items-center gap-1 font-semibold text-[#C8792C]">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedAt || 'Published 2026'}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#5B4632]" />
                {post.author}
              </span>
              <span>&bull;</span>
              <span>{post.readTimeMinutes || 5} min read</span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF6F0] border border-[#E8DFD5] text-[#5B4632] hover:border-[#C8792C] text-xs font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>

          {/* Article Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C221E] leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Summary Lead */}
          <p className="text-base sm:text-lg text-[#5A4E46] leading-relaxed font-light border-l-4 border-[#C8792C] pl-4 italic bg-[#FAF6F0]/60 py-2 rounded-r-md">
            {post.summary}
          </p>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden aspect-16/9 bg-[#FAF6F0] border border-[#E8DFD5]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* SEO Meta Highlights */}
          {post.metaDescription && (
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#F4D9A0]/60 text-xs text-[#5B4632]">
              <span className="font-bold text-[#C8792C] block mb-0.5">SEO Architectural Abstract:</span>
              <p className="italic">{post.metaDescription}</p>
            </div>
          )}

          {/* Article Body Content */}
          <div className="prose prose-stone max-w-none text-sm sm:text-base text-[#2C221E] leading-relaxed space-y-4 pt-4 border-t border-[#FAF6F0]">
            {post.content.split('\n\n').map((paragraph, idx) => {
              const text = paragraph.trim();
              if (text.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-[#5B4632] pt-4">
                    {text.replace('### ', '')}
                  </h3>
                );
              }
              if (text.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="font-serif text-lg sm:text-xl font-bold text-[#2C221E] pt-2">
                    {text.replace('#### ', '')}
                  </h4>
                );
              }
              if (text.startsWith('- ')) {
                const items = text.split('\n').filter((l) => l.startsWith('- '));
                return (
                  <ul key={idx} className="list-disc list-inside space-y-1.5 pl-2 text-sm text-[#5A4E46]">
                    {items.map((it, i) => (
                      <li key={i}>{it.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-[#2C221E] leading-relaxed">
                  {text}
                </p>
              );
            })}
          </div>

          {/* Keywords / Tags */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="pt-6 border-t border-[#E8DFD5] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#5B4632] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#C8792C]" />
                Topics:
              </span>
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-full bg-[#FAF6F0] text-xs font-medium text-[#5B4632] border border-[#E8DFD5]"
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}

          {/* Author Signature & Concierge Box */}
          <div className="mt-8 p-6 rounded-2xl bg-[#5B4632] text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#F4D9A0]/30 shadow-md">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#F4D9A0] font-semibold mb-1">
                <Sparkles className="w-4 h-4 text-[#F4D9A0]" />
                <span>Satarupa Steel Enterprise &bull; Madpur Station Bajar</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#FAF6F0]">
                Planning an Architectural Project, Mandir or Metal Fabrications?
              </h4>
              <p className="text-xs text-[#FAF6F0]/80 mt-1 max-w-md">
                Consult with our senior master fabricators and joiners directly on WhatsApp or visit our workshop at Madpur Station Bajar.
              </p>
            </div>

            <a
              href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                `Hello Satarupa Steel Enterprise! I read your article "${post.title}" and would like to consult on bespoke fabrication for my home.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wood-gold text-xs sm:text-sm px-6 py-3 font-semibold shrink-0 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Discuss Project on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Other Recommended Articles */}
        {otherPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="font-serif text-2xl font-bold text-[#2C221E] mb-6">
              More Recommended Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onNavigate(`/blog/${p.slug}`)}
                  className="p-5 rounded-2xl bg-white border border-[#E8DFD5] hover:border-[#F4D9A0] shadow-xs cursor-pointer group transition-all"
                >
                  <span className="text-[11px] font-semibold text-[#C8792C] uppercase tracking-wider block mb-1">
                    {p.author}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#2C221E] group-hover:text-[#5B4632] transition-colors line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#5A4E46] line-clamp-2 mt-2">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#5B4632] group-hover:text-[#C8792C]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
