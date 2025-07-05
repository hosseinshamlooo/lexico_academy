"use client";

import React, { useState, useRef } from "react";
import { FaMarker } from "react-icons/fa6";

interface Highlight {
  id: string;
  paragraphIndex: number;
  start: number;
  end: number;
  text: string;
  note: string;
  color: string;
}

interface CardPracticePassageProps {
  title: string;
  passage: string;
}

const HIGHLIGHT_COLOR = "bg-yellow-200";

function CardPracticePassage({ title, passage }: CardPracticePassageProps) {
  const [isMarkerActive, setIsMarkerActive] = useState(false);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [currentHighlight, setCurrentHighlight] =
    useState<Partial<Highlight> | null>(null);
  const [noteBoxPosition, setNoteBoxPosition] = useState({ x: 0, y: 0 });
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Split by double newlines for paragraphs
  const paragraphs = passage.split(/\n\s*\n/);
  // Detect if any paragraph starts with a letter
  const hasLetters = paragraphs.some((para) => /^([A-Z])\.\s+/.test(para));

  const handleTextSelection = (paragraphIndex: number) => {
    if (!isMarkerActive) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();

    if (selectedText.length === 0) return;

    // Check if the selection is within the current paragraph
    const paragraphElement = paragraphRefs.current[paragraphIndex];
    if (
      !paragraphElement ||
      !paragraphElement.contains(range.commonAncestorContainer)
    ) {
      return;
    }

    // Get the text content of this specific paragraph
    const paragraphText = paragraphElement.textContent || "";
    const start = paragraphText.indexOf(selectedText);
    const end = start + selectedText.length;

    if (start === -1) return;

    // Get the position of the selection for the note box (using page coordinates)
    const rect = range.getBoundingClientRect();

    setNoteBoxPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 5,
    });

    setCurrentHighlight({
      paragraphIndex,
      start,
      end,
      text: selectedText,
      color: HIGHLIGHT_COLOR,
    });
    setShowNoteBox(true);
    setCurrentNote("");
  };

  const addHighlight = () => {
    if (!currentHighlight) return;

    const newHighlight: Highlight = {
      id: Date.now().toString(),
      paragraphIndex: currentHighlight.paragraphIndex!,
      start: currentHighlight.start!,
      end: currentHighlight.end!,
      text: currentHighlight.text!,
      note: currentNote,
      color: currentHighlight.color!,
    };

    setHighlights((prev) => [...prev, newHighlight]);
    setShowNoteBox(false);
    setCurrentNote("");
    setCurrentHighlight(null);

    // Clear selection
    window.getSelection()?.removeAllRanges();
  };

  const cancelHighlight = () => {
    setShowNoteBox(false);
    setCurrentNote("");
    setCurrentHighlight(null);
    window.getSelection()?.removeAllRanges();
  };

  const removeHighlight = (highlightId: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== highlightId));
  };

  const renderTextWithHighlights = (text: string, paragraphIndex: number) => {
    // Get highlights for this specific paragraph
    const paragraphHighlights = highlights.filter(
      (h) => h.paragraphIndex === paragraphIndex
    );

    // Add current temporary highlight if it's for this paragraph
    const allHighlights = [...paragraphHighlights];
    if (
      currentHighlight &&
      currentHighlight.paragraphIndex === paragraphIndex
    ) {
      allHighlights.push({
        id: "temp",
        paragraphIndex: currentHighlight.paragraphIndex,
        start: currentHighlight.start!,
        end: currentHighlight.end!,
        text: currentHighlight.text!,
        note: "",
        color: currentHighlight.color!,
      });
    }

    if (allHighlights.length === 0) return text;

    // Sort highlights by start position
    const sortedHighlights = [...allHighlights].sort(
      (a, b) => a.start - b.start
    );

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    sortedHighlights.forEach((highlight, index) => {
      // Add text before highlight
      if (highlight.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {text.slice(lastIndex, highlight.start)}
          </span>
        );
      }

      // Add highlighted text
      parts.push(
        <span
          key={`highlight-${highlight.id}`}
          className={`${highlight.color} cursor-pointer relative group`}
        >
          {text.slice(highlight.start, highlight.end)}
          {highlight.id !== "temp" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeHighlight(highlight.id);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              {highlight.note && (
                <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                  {highlight.note}
                </div>
              )}
            </>
          )}
        </span>
      );

      lastIndex = highlight.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key="text-end">{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  const renderParagraph = (para: string, idx: number) => {
    const match = para.match(/^([A-Z])\.\s+(.*)$/);

    if (match) {
      return (
        <div
          key={idx}
          className="flex items-start gap-3 relative"
          ref={(el) => {
            paragraphRefs.current[idx] = el;
          }}
          onMouseUp={() => handleTextSelection(idx)}
        >
          <span
            className="flex-shrink-0 text-xl font-extrabold leading-none pt-1 min-w-[2.5rem] text-center"
            style={{ color: "#1D5554" }}
          >
            {match[1]}
          </span>
          <span className="block text-base leading-relaxed">
            {renderTextWithHighlights(match[2], idx)}
          </span>
        </div>
      );
    } else {
      return (
        <div
          key={idx}
          className="flex items-start gap-3 relative"
          ref={(el) => {
            paragraphRefs.current[idx] = el;
          }}
          onMouseUp={() => handleTextSelection(idx)}
        >
          <span className="flex-shrink-0 min-w-[2.5rem]"></span>
          <span className="block text-base leading-relaxed">
            {renderTextWithHighlights(para, idx)}
          </span>
        </div>
      );
    }
  };

  const renderSimpleParagraph = (para: string, idx: number) => (
    <p
      key={idx}
      className="text-base leading-relaxed relative"
      ref={(el) => {
        paragraphRefs.current[idx] = el;
      }}
      onMouseUp={() => handleTextSelection(idx)}
    >
      {renderTextWithHighlights(para, idx)}
    </p>
  );

  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col relative">
      {/* Marker Toggle Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsMarkerActive(!isMarkerActive)}
          className={`p-2 rounded-full shadow-lg transition-all ${
            isMarkerActive ? "text-white" : "text-gray-600 hover:bg-gray-300"
          }`}
          style={{
            backgroundColor: isMarkerActive
              ? "var(--color-primary, #1D5554)"
              : "#f3f4f6",
          }}
          title={isMarkerActive ? "Disable marker" : "Enable marker"}
        >
          <FaMarker size={16} />
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4 text-center flex-shrink-0 pr-12">
        {title}
      </h2>
      <div
        className={`text-gray-800 space-y-6 flex-1 overflow-y-auto scrollbar-hide ${
          isMarkerActive ? "cursor-text" : ""
        }`}
      >
        {hasLetters
          ? paragraphs.map((para, idx) => renderParagraph(para, idx))
          : paragraphs.map((para, idx) => renderSimpleParagraph(para, idx))}
      </div>

      {/* Note Box - Fixed positioning to extend beyond card boundaries */}
      {showNoteBox && (
        <div
          className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-[200px]"
          style={{
            left: noteBoxPosition.x,
            top: noteBoxPosition.y,
          }}
        >
          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-1">
              Note (optional):
            </label>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
              rows={2}
              placeholder="Add a note..."
              autoFocus
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={cancelHighlight}
              className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={addHighlight}
              className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardPracticePassage;
