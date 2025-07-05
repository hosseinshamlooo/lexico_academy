"use client";

import React, { useState } from "react";
import { FaMarker } from "react-icons/fa6";

interface Highlight {
  id: string;
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

const HIGHLIGHT_COLORS = [
  "bg-yellow-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-pink-200",
  "bg-purple-200",
];

function CardPracticePassage({ title, passage }: CardPracticePassageProps) {
  const [isMarkerActive, setIsMarkerActive] = useState(false);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedText, setSelectedText] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [currentHighlight, setCurrentHighlight] =
    useState<Partial<Highlight> | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Split by double newlines for paragraphs
  const paragraphs = passage.split(/\n\s*\n/);
  // Detect if any paragraph starts with a letter
  const hasLetters = paragraphs.some((para) => /^([A-Z])\.\s+/.test(para));

  const handleTextSelection = () => {
    if (!isMarkerActive) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();

    if (selectedText.length === 0) return;

    // Get the full passage text and find the start/end positions
    const fullText = passage.replace(/\n\s*\n/g, "\n\n");
    const start = fullText.indexOf(selectedText);
    const end = start + selectedText.length;

    if (start === -1) return;

    setSelectedText(selectedText);
    setCurrentHighlight({
      start,
      end,
      text: selectedText,
      color: HIGHLIGHT_COLORS[selectedColorIndex],
    });
    setShowNoteModal(true);
  };

  const addHighlight = () => {
    if (!currentHighlight) return;

    const newHighlight: Highlight = {
      id: Date.now().toString(),
      start: currentHighlight.start!,
      end: currentHighlight.end!,
      text: currentHighlight.text!,
      note: currentNote,
      color: currentHighlight.color!,
    };

    setHighlights((prev) => [...prev, newHighlight]);
    setShowNoteModal(false);
    setCurrentNote("");
    setCurrentHighlight(null);
    setSelectedColorIndex((prev) => (prev + 1) % HIGHLIGHT_COLORS.length);

    // Clear selection
    window.getSelection()?.removeAllRanges();
  };

  const removeHighlight = (highlightId: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== highlightId));
  };

  const renderTextWithHighlights = (text: string) => {
    if (highlights.length === 0) return text;

    // Sort highlights by start position
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);

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
          onClick={() => {
            if (highlight.note) {
              alert(`Note: ${highlight.note}`);
            }
          }}
        >
          {text.slice(highlight.start, highlight.end)}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeHighlight(highlight.id);
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ×
          </button>
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
        <div key={idx} className="flex items-start gap-3">
          <span
            className="flex-shrink-0 text-xl font-extrabold leading-none pt-1 min-w-[2.5rem] text-center"
            style={{ color: "#1D5554" }}
          >
            {match[1]}
          </span>
          <span className="block text-base leading-relaxed">
            {renderTextWithHighlights(match[2])}
          </span>
        </div>
      );
    } else {
      return (
        <div key={idx} className="flex items-start gap-3">
          <span className="flex-shrink-0 min-w-[2.5rem]"></span>
          <span className="block text-base leading-relaxed">
            {renderTextWithHighlights(para)}
          </span>
        </div>
      );
    }
  };

  const renderSimpleParagraph = (para: string, idx: number) => (
    <p key={idx} className="text-base leading-relaxed">
      {renderTextWithHighlights(para)}
    </p>
  );

  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col relative">
      {/* Marker Toggle Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsMarkerActive(!isMarkerActive)}
          className={`p-2 rounded-full shadow-lg transition-all ${
            isMarkerActive
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
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
        onMouseUp={handleTextSelection}
      >
        {hasLetters
          ? paragraphs.map((para, idx) => renderParagraph(para, idx))
          : paragraphs.map((para, idx) => renderSimpleParagraph(para, idx))}
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add Note</h3>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Selected text:</p>
              <p className="bg-gray-100 p-2 rounded text-sm">{selectedText}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Highlight color:</p>
              <div className="flex gap-2">
                {HIGHLIGHT_COLORS.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`w-6 h-6 rounded-full ${color} border-2 ${
                      selectedColorIndex === index
                        ? "border-gray-800"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                Note (optional):
              </label>
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={3}
                placeholder="Add a note about this highlight..."
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowNoteModal(false);
                  setCurrentNote("");
                  setCurrentHighlight(null);
                  window.getSelection()?.removeAllRanges();
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addHighlight}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Highlight
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardPracticePassage;
