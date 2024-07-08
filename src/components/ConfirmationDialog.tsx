import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import React, {useState} from "react";
import ActionButton from "@/components/Button/ActionButton";

type ConfirmationDialogProps = {
    children?: React.ReactNode;
    heading: string;
    trigger: React.ReactNode;
    OnAction: () => Promise<void> | void
}

export default function ConfirmationDialog({children, heading, trigger, OnAction}: ConfirmationDialogProps) {

    const [loading, setLoading] = useState<boolean>(false)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    {trigger}
                </div>
            </DialogTrigger>
            <DialogContent className="w-[95%] sm:max-w-[400px]">
                <h1
                    className={"text-[1.1rem] text-gray-text font-[700]"}
                >
                    {heading}
                </h1>

                {
                    children || (
                        <p
                            className={"text-[.9rem] text-gray-text"}
                        >
                            Are you sure you want to perform this action?
                        </p>
                    )
                }

                <div
                    className={"flex justify-end items-center gap-2"}
                >
                    <DialogClose>
                        <ActionButton
                            variant="destructive"
                            className={"bg-gray-white text-error-text border-2 hover:bg-gray-white py-2 border-error-border  "}
                            loading={false}>
                            Cancel
                        </ActionButton>
                    </DialogClose>
                    <ActionButton
                        onClick={async () => {
                            setLoading(true)
                            await OnAction()

                            setLoading(false)
                        }}
                        loading={loading}>
                        Confirm
                    </ActionButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}
