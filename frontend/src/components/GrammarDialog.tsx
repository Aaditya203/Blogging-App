import DOMPurify from "dompurify";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type GrammarProps = {
    open: boolean;
    onOpenChange: (open:boolean)=>void;
    improvedContent:string;
    onAccept: ()=>void;
}

export const GrammarDialog = ({open,onOpenChange,improvedContent,onAccept}:GrammarProps)=>{
    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="w-[95vw] sm:max-w-5xl! h-[80vh] sm:h-[85vh] flex flex-col">

        <DialogHeader>
          <DialogTitle>
            AI Grammar Suggestions
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Preview */}
        <div className="flex-1 overflow-y-auto rounded-md border p-6 bg-muted/20">

          <div
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(improvedContent),
            }}
          />

        </div>

        <DialogFooter className="mt-4">

          <Button className={'py-5'}
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
          className={'py-5'}
            onClick={onAccept}
          >
            Accept Changes
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
    )
}