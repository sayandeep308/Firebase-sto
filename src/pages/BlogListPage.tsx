import React, { useState } from 'react';
import { BookOpen, Calendar, User, ArrowRight, Tag, Search } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogListPageProps {
  posts: BlogPost[];
  onNavigate: (path: string) => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ posts, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const publishedPosts = posts.filter((p) => p.isPublished);

  const filteredPosts = publishedPosts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      post.title.toLowerCase().includes(q) ||
      post.summary.toLowerCase().includes(q) ||
      post.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-12 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B4632]/10 text-[#5B4632] text-xs font-bold tracking-wide">
            <BookOpen className="w-3.5 h-3.5 text-[#C8792C]" />
            <span>The ArtisanCraft Journal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C221E] tracking-tight">
            Craft Journal, Architectural Guides &amp; Vastu Insights
          </h1>

          <p className="text-sm sm:text-base text-[#5A4E46] leading-relaxed">
            In-depth guides on sacred home temple architecture, timber seasoning, PVD titanium finishes, and custom ceiling acoustic design.
          </p>

          {/* Blog Search Input */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#5B4632] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides (e.g. mandir, teak, ceiling rafters)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#E8DFD5] bg-white text-xs sm:text-sm text-[#2C221E] focus:outline-hidden focus:border-[#C8792C] shadow-xs"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onNavigate(`/blog/${post.slug}`)}
                className="group rounded-2xl overflow-hidden bg-white border border-[#E8DFD5] hover:border-[#F4D9A0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Featured Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#FAF6F0]">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#5B4632]/85 text-[#F4D9A0] px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur-xs">
                    {post.readTimeMinutes || 5} min read
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-[#5A4E46] mb-2 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C8792C]" />
                        {post.publishedAt || '2026'}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 truncate">
                        <User className="w-3.5 h-3.5 text-[#C8792C]" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl font-bold text-[#2C221E] group-hover:text-[#5B4632] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="mt-2.5 text-xs text-[#5A4E46] line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>

                    {/* Keywords tags */}
                    {post.keywords && post.keywords.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.keywords.slice(0, 3).map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 rounded-sm bg-[#FAF6F0] text-[10px] text-[#5B4632] border border-[#E8DFD5] font-medium"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#FAF6F0] flex items-center justify-between text-xs font-semibold text-[#5B4632] group-hover:text-[#C8792C] transition-colors">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E8DFD5] max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-[#5B4632]/40 mx-auto mb-2" />
            <h3 className="font-serif text-lg font-bold text-[#2C221E]">No Articles Found</h3>
            <p className="text-xs text-[#5A4E46] mt-1">
              Try searching with another keyword or explore our full catalog.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 btn-wood text-xs px-4 py-2"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
