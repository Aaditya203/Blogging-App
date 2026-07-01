import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


interface Props{
    open: boolean;
    onOpenChange:(value:boolean)=>void;
    titles:string[];
    onSelect:(title:string)=>void;
}

export default function TitleSuggestionDialog({open,onOpenChange,titles,onSelect}:Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg w-[90vw] sm:w-full">

                <DialogHeader>
                    <DialogTitle>
                        AI Suggested Titles
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3 mt-4">

                    {titles.map((title, index) => (

                        <button
                            key={index}
                            onClick={() => {
                                onSelect(title);
                                onOpenChange(false);
                            }}
                            className="
                            w-full
                            rounded-xl
                            border
                            p-4
                            text-left
                            transition
                            hover:bg-muted
                            hover:border-primary
                            "
                        >
                            {title}
                        </button>

                    ))}

                </div>

            </DialogContent>
        </Dialog>
    )
}