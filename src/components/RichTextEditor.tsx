import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, List, Highlighter, Quote, Eraser, Sparkles, RefreshCw } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  title?: string;
  excerpt?: string;
  onAIUpdate?: (newTitle: string, newExcerpt: string, newContent: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  title = '',
  excerpt = '',
  onAIUpdate
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');

  // Sync internal editor HTML with external value on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '<p><br></p>';
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const handleImproveWithAI = async () => {
    if (!editorRef.current) return;
    setIsAILoading(true);
    setAiFeedback('');

    try {
      const currentContent = editorRef.current.innerHTML;
      const res = await fetch('/api/ai/improve-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          excerpt,
          content: currentContent
        })
      });

      if (!res.ok) throw new Error('AI refinement failed');
      const data = await res.json();

      if (data.improvedContent) {
        editorRef.current.innerHTML = data.improvedContent;
        onChange(data.improvedContent);
        
        if (onAIUpdate && (data.improvedTitle || data.improvedExcerpt)) {
          onAIUpdate(
            data.improvedTitle || title,
            data.improvedExcerpt || excerpt,
            data.improvedContent
          );
        }
        setAiFeedback('✨ Refined successfully with Gemini AI!');
      } else {
        setAiFeedback('Could not improve content. Try again.');
      }
    } catch (err: any) {
      setAiFeedback('AI request error: ' + err.message);
    } finally {
      setIsAILoading(false);
      setTimeout(() => setAiFeedback(''), 4000);
    }
  };

  return (
    <div className="w-full border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm flex flex-col min-h-[350px]">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-white/10 gap-2">
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => executeCommand('bold')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          
          <button
            type="button"
            onClick={() => executeCommand('italic')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          
          <button
            type="button"
            onClick={() => executeCommand('insertUnorderedList')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => executeCommand('hiliteColor', '#FFF2B2')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            title="Highlight Text"
          >
            <Highlighter className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => executeCommand('formatBlock', 'blockquote')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 mx-1" />

          <button
            type="button"
            onClick={() => executeCommand('removeFormat')}
            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
            title="Clear Formatting"
          >
            <Eraser className="h-4 w-4" />
          </button>
        </div>

        {/* GEMINI AI ASSISTANT INLINE BUTTON */}
        {onAIUpdate && (
          <div className="flex items-center space-x-2">
            {aiFeedback && (
              <span className="text-[10px] font-bold text-sky-500 dark:text-brand-cyan uppercase animate-pulse">
                {aiFeedback}
              </span>
            )}
            <button
              type="button"
              disabled={isAILoading}
              onClick={handleImproveWithAI}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              {isAILoading ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              <span>{isAILoading ? 'AI Working...' : 'Improve with Gemini'}</span>
            </button>
          </div>
        )}
      </div>

      {/* EDITABLE DIV */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="flex-1 p-4 outline-none text-sm text-brand-navy dark:text-slate-200 min-h-[280px] bg-transparent prose prose-sm dark:prose-invert max-w-none"
        placeholder="Start writing the full article here..."
      />
    </div>
  );
};
