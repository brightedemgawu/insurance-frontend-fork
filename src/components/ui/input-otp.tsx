"use client"

import * as React from "react"
import {DashIcon} from "@radix-ui/react-icons"
import {OTPInput, OTPInputContext} from "input-otp"

import {cn} from "@/lib/utils"

const InputOTP = React.forwardRef<
    React.ElementRef<typeof OTPInput>,
    React.ComponentPropsWithoutRef<typeof OTPInput>
>(({className, containerClassName, ...props}, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn(
            "flex items-center gap-2 has-[:disabled]:opacity-50",
            containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
    />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({className, ...props}, ref) => (
    <div ref={ref} className={cn("w-full flex items-center justify-between", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div"> & { index: number } & { invalid?: boolean }
>(({index, className, invalid, ...props}, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const {char, hasFakeCaret, isActive} = inputOTPContext.slots[index]

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex h-[55px] w-[55px] items-center justify-center border border-greyscale-border rounded-lg  text-gray-text text-lg transition-all",
                isActive && "z-10 ring-2 ring-primary-border",
                invalid && "border-error-border",
                invalid && isActive && "ring-error-border",
                className
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000"/>
                </div>
            )}
        </div>
    )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({...props}, ref) => (
    <div ref={ref} role="separator" {...props}>
        <DashIcon/>
    </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export {InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator}
