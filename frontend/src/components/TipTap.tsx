
import { Toggle } from './ui/toggle'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useEditor, EditorContent,Editor, useEditorState } from '@tiptap/react'
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { BoldIcon, CodeIcon, Heading1, Heading2, Heading3, HighlighterIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, Quote, RedoIcon, StrikethroughIcon, UnderlineIcon, UndoIcon, UnlinkIcon } from 'lucide-react'
import Highlight from "@tiptap/extension-highlight";
import { useEffect, useState, type ReactNode } from 'react';
import Placeholder from "@tiptap/extension-placeholder";

type TipTapProps = {
  onChange: (content:string) => void,
  content?: string
};

const Tiptap = ({onChange,content=""}:TipTapProps) => {
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0) 
  const editor = useEditor({
    extensions: [StarterKit,Highlight.configure({multicolor:true}),
       Placeholder.configure({
      placeholder: "Start writing your story...",
    }),
    ], 
    content: content, 
    onUpdate: ({ editor }) => {
    onChange(editor.getHTML());
    const text = editor.getText()
      const words = text.trim() ? text.trim().split(/\s+/).length : 0
      setWordCount(words)
      setCharCount(text.length)
  },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none",
      },
    },
  })
  useEffect(() => {
  if (!editor) return;

  // Prevent infinite updates
  if (content !== editor.getHTML()) {
    editor.commands.setContent(content, {
      emitUpdate: false,
    });
  }
}, [content, editor]);

  return (
    <div className='bg-background flex flex-col rounded-lg border shadow-sm h-[calc(100dvh-160px)]'>
      {editor && <ToolBar editor={editor}/>}
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} className="min-h-full px-2 sm:px-4 py-3 font-inter" />
        <BubbleMenu editor={editor} />
      </div>
       <div className="flex items-center justify-between border-t px-4 py-1.5 shrink-0">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Words: <span className="font-medium text-foreground">{wordCount}</span></span>
          <span>Characters: <span className="font-medium text-foreground">{charCount}</span></span>
        </div>
      </div>
    </div>
  )
}

export default Tiptap;

function LinkComponent({
  editor,
  children,
}: {
  editor: Editor;
  children: ReactNode;
}) {
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const handleSetLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsLinkPopoverOpen(false);
    setLinkUrl("");
  };

  return (
    <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      {/* // this is the main */}
      {/* trigger point */}
      <PopoverContent className="w-80 p-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Insert Link</h3>
          <Input
            placeholder="https://example.com"
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSetLink();
              }
            }}
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsLinkPopoverOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSetLink}>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}


const ToolBar = ({editor}:{editor: Editor})=>{
  const editorState =  useEditorState({editor,selector:(ctx)=>{
    return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
        canRedo: editor.can().redo(),
        canUndo: editor.can().undo(),
        isHeading2: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
    }
  }})
  return <div className="flex flex-wrap items-center gap-1 border-b px-2 py-1 overflow-x-auto">
          <Toggle size="sm"
        pressed={editorState.isHeading2}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        aria-label="Toggle bold"
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
          <Toggle size="sm"
        pressed={editorState.isHeading3}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        aria-label="Toggle bold"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
          <Toggle size="sm"
        pressed={editorState.isHeading4}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        aria-label="Toggle bold"
      >
        <Heading3 className="h-4 w-4" />
        </Toggle>
          <Toggle size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>
            <Toggle
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle italic"
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Toggle underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strikethrough"
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isHighlight}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()
        }
        aria-label="Toggle highlight"
      >
        <HighlighterIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Toggle code"
      >
        <CodeIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Toggle bullet list"
      >
        <ListIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Toggle ordered list"
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Toggle blockquote"
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      <div className="bg-border mx-1 h-6 w-px" />

      {editorState.isLink ? (
        <Toggle
          pressed
          onPressedChange={() =>
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
          }
        >
          <UnlinkIcon className="h-4 w-4" />
        </Toggle>
      ) : (
        <LinkComponent editor={editor}>
          <Toggle size="sm" aria-label="Toggle link">
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </LinkComponent>
      )}
      <div className="bg-border mx-1 h-6 w-px" />
       <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        aria-label="Undo"
      >
        <UndoIcon className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        aria-label="Redo"
      >
        <RedoIcon className="h-4 w-4" />
      </Button>

        </div>
}

export function BubbleMenu({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
      };
    },
  });

  return (
    <TiptapBubbleMenu
      editor={editor}
      className="bg-background flex items-center rounded-md border shadow-md relative z-200"
    >
      <Toggle
        size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle bold"
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Toggle underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strikethrough"
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isHighlight}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: "#fdeb80" }).run()
        }
        aria-label="Toggle highlight"
      >
        <HighlighterIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Toggle code"
      >
        <CodeIcon className="h-4 w-4" />
      </Toggle>
      <div className="bg-border mx-1 h-6 w-px" />

      <Toggle
        size="sm"
        pressed={editorState.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Toggle bullet list"
      >
        <ListIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Toggle ordered list"
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Toggle blockquote"
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      <div className="bg-border mx-1 h-6 w-px" />

      {editorState.isLink ? (
        <Toggle
          pressed
          onPressedChange={() =>
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
          }
        >
          <UnlinkIcon className="h-4 w-4" />
        </Toggle>
      ) : (
        <LinkComponent editor={editor}>
          <Toggle size="sm" aria-label="Toggle link">
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </LinkComponent>
      )}
    </TiptapBubbleMenu>
  );
}