"use client";

import { useTransition, useRef, ReactNode } from "react";
import { toast } from "sonner";

interface ActionFormProps {
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean; message?: string }>;
  children: ReactNode;
  successMessage?: string;
  resetOnSuccess?: boolean;
  className?: string;
}

export function ActionForm({
  action,
  children,
  successMessage,
  resetOnSuccess = false,
  className
}: ActionFormProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const result = await action(formData);
        if (result?.error) {
          toast.error(result.error);
        } else if (result?.success) {
          toast.success(result.message || successMessage || "İşlem başarıyla tamamlandı.");
          if (resetOnSuccess) {
            formRef.current?.reset();
          }
        }
      } catch (error) {
        toast.error("Beklenmeyen bir hata oluştu.");
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={className}>
      {/* We can use a fieldset to disable all inputs while pending */}
      <fieldset disabled={isPending} className="contents border-none p-0 m-0 min-w-0">
        {children}
      </fieldset>
    </form>
  );
}
