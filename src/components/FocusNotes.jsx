import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Compass, Zap, BrainCircuit } from 'lucide-react';

const FOCUS_SLIDES = [
  {
    id: 1,
    tag: 'FOCUS NOTES · 1 OF 3',
    title: 'Plan your day',
    description: 'Organise your priorities and focus on what matters most. Single-task to protect cognitive energy and avoid the 40% penalty of context-switching.',
    icon: Compass
  },
  {
    id: 2,
    tag: 'FOCUS NOTES · 2 OF 3',
    title: 'The Two-Minute Rule',
    description: 'If an upcoming task requires less than two minutes, complete it immediately. For larger tasks, outline only the very next physical action to overcome inertia.',
    icon: Zap
  },
  {
    id: 3,
    tag: 'FOCUS NOTES · 3 OF 3',
    title: 'Protect 90-Minute Focus Blocks',
    description: 'Work in dedicated 90-minute ultradian rhythm intervals during your peak hours to achieve deep creative flow and maintain sustained daily output.',
    icon: BrainCircuit
  }
];

export default function FocusNotes() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = FOCUS_SLIDES.length;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const active = FOCUS_SLIDES[currentSlide];
  const IconComponent = active.icon;

  return (
    <section 
      className="focus-notes-container" 
      aria-label="Focus Notes & Productivity Insights"
    >
      <div className="focus-notes-header">
        <div className="focus-header-meta">
          <span className="focus-pill">{active.tag}</span>
        </div>

        <div className="focus-nav-controls">
          <button
            type="button"
            className="carousel-nav-btn"
            onClick={handlePrev}
            aria-label="Previous productivity note"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="carousel-indicators" role="tablist" aria-label="Slide indicators">
            {FOCUS_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Go to slide ${index + 1}`}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="carousel-nav-btn"
            onClick={handleNext}
            aria-label="Next productivity note"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="focus-slide-content">
        <div className="focus-icon-container" aria-hidden="true">
          <IconComponent size={20} className="focus-slide-icon" />
        </div>
        <div className="focus-text-block">
          <h3 className="focus-slide-title">{active.title}</h3>
          <p className="focus-slide-description">{active.description}</p>
        </div>
      </div>
    </section>
  );
}
