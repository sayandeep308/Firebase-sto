import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { HeroSlide } from '../types';

interface HeroSliderProps {
  slides: HeroSlide[];
  onNavigate: (path: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides, onNavigate }) => {
  const activeSlides = slides.filter((s) => s.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSlides.length, isPaused]);

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <section
      aria-label="Hero Showcase Slider"
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] overflow-hidden bg-[#2C221E] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Background Images with Smooth Crossfade */}
      {activeSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
          />
          {/* Multi-layered Vignette & Dark Gradient Overlay for Maximum Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C221E]/95 via-[#463525]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E] via-transparent to-black/30" />
        </div>
      ))}

      {/* Slide Content Box */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-[#FAF6F0] space-y-6 animate-fadeIn">
          {/* Subtle Champagne Gold Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B4632]/80 border border-[#F4D9A0]/50 text-xs text-[#F4D9A0] font-semibold tracking-wide backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F4D9A0]" />
            <span>Mastercrafted Luxury Architecture</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6F0] leading-tight tracking-tight drop-shadow-md">
            {currentSlide.title?.replace(/\s*&\s*/g, ' and ')}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#FAF6F0]/90 leading-relaxed font-light drop-shadow">
            {currentSlide.subtitle?.replace(/\s*&\s*/g, ' and ')}
          </p>

          {/* CTA Buttons (Reference 1 Metallic Gold Bezel Pill Buttons) */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate(currentSlide.ctaLink || '/products')}
              className="btn-gold-pill px-7 sm:px-9 py-3.5 text-sm sm:text-base font-bold group flex items-center gap-2 shadow-lg"
            >
              <span>{currentSlide.ctaText || 'Explore Catalog'}</span>
              <ArrowRight className="w-4 h-4 text-[#241403] group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('/contact')}
              className="btn-gold-pill-light px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg"
            >
              Request Custom Estimate
            </button>
          </div>
        </div>
      </div>

      {/* Manual Prev / Next Controls */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#5B4632]/70 hover:bg-[#5B4632] border border-[#F4D9A0]/40 text-[#F4D9A0] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-xs shadow-lg hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#5B4632]/70 hover:bg-[#5B4632] border border-[#F4D9A0]/40 text-[#F4D9A0] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-xs shadow-lg hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Indicator Dots */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-[#463525]/60 px-3.5 py-1.5 rounded-full backdrop-blur-xs border border-[#F4D9A0]/20">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Jump to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 h-2.5 bg-[#F4D9A0] shadow-sm'
                  : 'w-2.5 h-2.5 bg-[#FAF6F0]/40 hover:bg-[#FAF6F0]'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
