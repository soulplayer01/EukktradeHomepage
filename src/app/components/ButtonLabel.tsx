interface ButtonLabelProps {
  children: React.ReactNode;
}

export function ButtonLabel({ children }: ButtonLabelProps) {
  return (
    <span
      style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.04em' }}
      className="block mt-2 text-muted-foreground text-center"
    >
      {children}
    </span>
  );
}

interface ButtonCellProps {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}

export function ButtonCell({ label, children, wide }: ButtonCellProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${wide ? 'col-span-2' : ''}`}>
      {children}
      <ButtonLabel>{label}</ButtonLabel>
    </div>
  );
}

interface ButtonRowProps {
  title: string;
  children: React.ReactNode;
}

export function ButtonRow({ title, children }: ButtonRowProps) {
  return (
    <div className="mb-8">
      <p
        style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em' }}
        className="uppercase text-muted-foreground mb-5"
      >
        {title}
      </p>
      <div className="flex flex-wrap items-center gap-6">
        {children}
      </div>
    </div>
  );
}

interface GridSectionProps {
  title: string;
  children: React.ReactNode;
  cols?: number;
}

export function GridSection({ title, children, cols = 6 }: GridSectionProps) {
  return (
    <div className="mb-8">
      <p
        style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em' }}
        className="uppercase text-muted-foreground mb-5"
      >
        {title}
      </p>
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {children}
      </div>
    </div>
  );
}
