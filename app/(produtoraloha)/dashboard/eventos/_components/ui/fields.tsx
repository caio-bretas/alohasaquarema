import { useFormContext } from "react-hook-form";
import { Info } from "lucide-react";

export function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
        {children}
      </span>
      {hint && (
        <span title={hint}><Info className="size-3 text-zinc-400 cursor-help" /></span>
      )}
    </div>
  );
}

export function FormField({ name, label, hint, type = "text", ...props }: any) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="w-full">
      <Label hint={hint}>{label}</Label>
      <input
        {...register(name)}
        type={type}
        className={`w-full bg-zinc-50 border ${error ? 'border-red-500' : 'border-zinc-200'} rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-all`}
        {...props}
      />
      {error && <p className="text-[10px] text-red-500 font-bold mt-1">{error}</p>}
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-lg font-black text-zinc-900 tracking-tighter uppercase italic leading-none">
          {children}
        </h1>
    )
}

export function Select({ name, children }: { name: string; children: React.ReactNode }) {
    const { register } = useFormContext();
    return <select {...register(name)}>{children}</select>;
}