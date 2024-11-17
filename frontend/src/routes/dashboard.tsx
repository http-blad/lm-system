import { RouteSectionProps } from "@solidjs/router";
import { FilePlus2, FileText, SearchCheck } from "lucide-solid";
import { Component, For } from "solid-js";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "~/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import Input from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "~/components/ui/tooltip";

const SearchDialog: Component<{}> = (props) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Tooltip>
                    <TooltipTrigger>
                        <Button variant={"ghost"}>
                            <SearchCheck size={16} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Search</TooltipContent>
                </Tooltip>
            </DialogTrigger>
            <DialogContent class="max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                    <DialogDescription>Search your files</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

const UploadNewFile: Component<{}> = (props) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Tooltip>
                    <TooltipTrigger>
                        <Button variant={"ghost"}>
                            <FilePlus2 size={16} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>New file</TooltipContent>
                </Tooltip>
            </DialogTrigger>
            <DialogContent class="max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Upload file</DialogTitle>
                    <DialogDescription>
                        Upload a PDF compatible file
                    </DialogDescription>
                </DialogHeader>
                <div class="items-top flex flex-col gap-2">
                    <Label class="text-muted-foreground">Choose file</Label>
                    <Input type="file" />
                </div>
                <DialogFooter>
                    <Button>Upload File</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const DashboardLayout = (props: RouteSectionProps) => {
    return (
        <main class="h-screen max-h-screen grid grid-cols-12 w-full max-w-[1920px]  lg:mx-auto border">
            <aside class="hidden lg:block lg:col-span-2 p-4 h-full overflow-y-auto">
                <div class="flex flex-row xl:justify-between justify-center items-center">
                    <span class="hidden xl:block">LM-System</span>
                    <div>
                        <SearchDialog />
                        <UploadNewFile />
                    </div>
                </div>
                <div class="h-full py-4 space-y-2.5">
                    <For each={Array.from(Array(20).keys())}>
                        {() => (
                            <Button
                                variant={"ghost"}
                                class="justify-start w-full gap-2.5"
                            >
                                <FileText size={16} />
                                <p class="truncate">a random pdf file</p>
                            </Button>
                        )}
                    </For>
                </div>
            </aside>
            <div class="col-span-full lg:col-span-10 p-4 bg-accent w-full h-full">
                {props.children}
            </div>
        </main>
    );
};

export default DashboardLayout;
