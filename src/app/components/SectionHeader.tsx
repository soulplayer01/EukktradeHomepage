interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <span
        style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em' }}
        className="uppercase text-muted-foreground tracking-widest"
      >
        {label}
      </span>
      <h2 className="mt-1 text-foreground" style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      {description && (
        <p style={{ fontSize: '13px', marginTop: '4px' }} className="text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-5 border-t border-border" />
    </div>
  );
}
