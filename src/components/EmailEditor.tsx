"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import Typography from "@tiptap/extension-typography";
import { useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
    Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight, Link as LinkIcon,
    Heading2, Heading3, Quote, Undo, Redo, RemoveFormatting,
    Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
    Highlighter, Table as TableIcon, Image as ImageIcon,
    Minus, Code, Strikethrough,
} from "lucide-react";

interface EmailEditorProps {
    content: string;
    onChange?: (html: string) => void;
    className?: string;
}

function ToolbarButton({
    onClick, isActive, disabled, title, children,
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            title={title}
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "p-1.5 rounded-md transition-all duration-150 text-slate-500 dark:text-slate-400",
                "hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white",
                "disabled:opacity-30 disabled:cursor-not-allowed",
                isActive && "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
            )}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-0.5 shrink-0" />;
}

const TEXT_COLORS = ["#000000", "#374151", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
const HIGHLIGHT_COLORS = ["#fef08a", "#bbf7d0", "#bfdbfe", "#fecaca", "#e9d5ff", "#fed7aa"];

export function EmailEditor({ content, onChange, className }: EmailEditorProps) {
    const colorInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
            Underline,
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: "text-blue-600 dark:text-blue-400 underline cursor-pointer" },
            }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Subscript,
            Superscript,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            Image.configure({ HTMLAttributes: { class: "max-w-full rounded-lg my-2" } }),
            CharacterCount,
            Typography,
        ],
        content,
        editorProps: {
            attributes: {
                class: "outline-none min-h-[220px] leading-relaxed text-[15px]",
            },
        },
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content, { emitUpdate: false });
        }
    }, [content, editor]);

    const addLink = useCallback(() => {
        if (!editor) return;
        const prev = editor.getAttributes("link").href as string | undefined;
        const url = window.prompt("Enter URL", prev ?? "https://");
        if (url === null) return;
        if (url === "") editor.chain().focus().unsetLink().run();
        else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    const insertImage = useCallback(() => {
        if (!editor) return;
        const url = window.prompt("Image URL", "https://");
        if (url) editor.chain().focus().setImage({ src: url }).run();
    }, [editor]);

    const insertTable = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }, [editor]);

    if (!editor) return null;

    const charCount = editor.storage.characterCount.characters();
    const wordCount = editor.storage.characterCount.words();

    return (
        <div className={cn("rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col", className)}>
            {/* ── Toolbar ── */}
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-2 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10">

                {/* History */}
                <ToolbarButton title="Undo (Ctrl+Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
                    <Undo className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Redo (Ctrl+Y)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
                    <Redo className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                {/* Headings */}
                <ToolbarButton title="Heading 2" isActive={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Heading 3" isActive={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                    <Heading3 className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                {/* Inline marks */}
                <ToolbarButton title="Bold (Ctrl+B)" isActive={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
                    <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Italic (Ctrl+I)" isActive={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Underline (Ctrl+U)" isActive={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <UnderlineIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Strikethrough" isActive={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
                    <Strikethrough className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Inline Code" isActive={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
                    <Code className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Subscript" isActive={editor.isActive("subscript")} onClick={() => editor.chain().focus().toggleSubscript().run()}>
                    <SubscriptIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Superscript" isActive={editor.isActive("superscript")} onClick={() => editor.chain().focus().toggleSuperscript().run()}>
                    <SuperscriptIcon className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                {/* Text color */}
                <div className="relative group" title="Text Color">
                    <button
                        type="button"
                        className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                        onClick={() => colorInputRef.current?.click()}
                    >
                        <span className="flex flex-col items-center gap-0.5">
                            <span className="font-bold text-xs leading-none text-slate-700 dark:text-slate-300" style={{ fontFamily: "serif" }}>A</span>
                            <span
                                className="h-1 w-4 rounded-full"
                                style={{ backgroundColor: editor.getAttributes("textStyle").color ?? "#3b82f6" }}
                            />
                        </span>
                    </button>
                    <input
                        ref={colorInputRef}
                        type="color"
                        className="absolute opacity-0 w-0 h-0"
                        defaultValue="#3b82f6"
                        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                    />
                    {/* Color swatches */}
                    <div className="absolute hidden group-hover:flex top-full left-0 mt-1 z-20 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg shadow-xl gap-1 flex-wrap w-40">
                        {TEXT_COLORS.map(c => (
                            <button
                                key={c}
                                type="button"
                                title={c}
                                onClick={() => editor.chain().focus().setColor(c).run()}
                                className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform"
                                style={{ backgroundColor: c }}
                            />
                        ))}
                        <button type="button" onClick={() => editor.chain().focus().unsetColor().run()} className="text-[10px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mt-1">Reset</button>
                    </div>
                </div>

                {/* Highlight */}
                <div className="relative group" title="Highlight">
                    <button type="button" className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                        <Highlighter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    </button>
                    <div className="absolute hidden group-hover:flex top-full left-0 mt-1 z-20 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg shadow-xl gap-1 flex-wrap w-36">
                        {HIGHLIGHT_COLORS.map(c => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => editor.chain().focus().toggleHighlight({ color: c }).run()}
                                className="w-5 h-5 rounded border border-slate-200 dark:border-white/10 hover:scale-110 transition-transform"
                                style={{ backgroundColor: c }}
                            />
                        ))}
                        <button type="button" onClick={() => editor.chain().focus().unsetHighlight().run()} className="text-[10px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mt-1">Reset</button>
                    </div>
                </div>

                <Divider />

                {/* Lists */}
                <ToolbarButton title="Bullet List" isActive={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Numbered List" isActive={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Blockquote" isActive={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                    <Quote className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    <Minus className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                {/* Alignment */}
                <ToolbarButton title="Align Left" isActive={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
                    <AlignLeft className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Align Center" isActive={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
                    <AlignCenter className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Align Right" isActive={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
                    <AlignRight className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                {/* Insert */}
                <ToolbarButton title="Insert Link" isActive={editor.isActive("link")} onClick={addLink}>
                    <LinkIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Insert Image" onClick={insertImage}>
                    <ImageIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton title="Insert Table" isActive={editor.isActive("table")} onClick={insertTable}>
                    <TableIcon className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                {/* Clear */}
                <ToolbarButton title="Clear Formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
                    <RemoveFormatting className="h-4 w-4" />
                </ToolbarButton>
            </div>

            {/* ── Editor ── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 bg-white dark:bg-white/5 min-h-[220px]">
                <EditorContent
                    editor={editor}
                    className="prose prose-slate dark:prose-invert max-w-none
                        prose-p:my-2 prose-p:text-slate-800 dark:prose-p:text-slate-200
                        prose-headings:text-slate-900 dark:prose-headings:text-white
                        prose-ul:my-2 prose-li:my-0
                        prose-strong:text-slate-900 dark:prose-strong:text-white
                        prose-a:text-blue-600 dark:prose-a:text-blue-400
                        prose-blockquote:border-l-4 prose-blockquote:border-blue-400 dark:prose-blockquote:border-blue-500
                        prose-code:bg-slate-100 dark:prose-code:bg-white/10 prose-code:rounded prose-code:px-1
                        prose-table:border-collapse prose-td:border prose-td:border-slate-200 dark:prose-td:border-white/10 prose-td:p-2
                        prose-th:border prose-th:border-slate-200 dark:prose-th:border-white/10 prose-th:p-2 prose-th:bg-slate-50 dark:prose-th:bg-white/5"
                />
            </div>

            {/* ── Footer: character & word count ── */}
            <div className="flex items-center justify-end gap-4 px-4 py-1.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-400 dark:text-slate-500">
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
            </div>
        </div>
    );
}
