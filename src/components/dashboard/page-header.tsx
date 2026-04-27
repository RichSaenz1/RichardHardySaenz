type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {eyebrow ? (
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-viva-green">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-viva-ink sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-viva-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
