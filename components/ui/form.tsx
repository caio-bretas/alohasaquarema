"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Controller,
  FormProvider,
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
  type ControllerRenderProps,
} from "react-hook-form"

const FormFieldContext = React.createContext<string | undefined>(undefined)

export function Form<TFormValues extends FieldValues>({
  children,
  ...props
}: React.PropsWithChildren<UseFormReturn<TFormValues>>) {
  return <FormProvider {...props}>{children}</FormProvider>
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  render,
}: {
  control: Control<TFieldValues>
  name: TName
  render: (props: { field: ControllerRenderProps<TFieldValues, TName> }) => React.ReactNode
}) {
  return (
    <FormFieldContext.Provider value={name as string}>
      <Controller control={control} name={name} render={render as any} />
    </FormFieldContext.Provider>
  )
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />
}

export function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-semibold text-zinc-700", className)} {...props} />
}

export function FormControl({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-full", className)} {...props} />
}

export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const fieldName = React.useContext(FormFieldContext)
  const {
    formState: { errors },
  } = useFormContext()
  const error = fieldName ? (errors as any)[fieldName]?.message : undefined

  if (!error && !children) {
    return null
  }

  return (
    <p className={cn("text-sm text-destructive", className)} {...props}>
      {children ?? error}
    </p>
  )
}
