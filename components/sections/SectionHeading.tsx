import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {title ? (
          <>
            {eyebrow ? (
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
              {title}
            </h2>
          </>
        ) : eyebrow ? (
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            {eyebrow}
          </h2>
        ) : null}
        {description ? (
          <p className={`${title || eyebrow ? "mt-3" : ""} text-base leading-7 text-muted-foreground`}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
