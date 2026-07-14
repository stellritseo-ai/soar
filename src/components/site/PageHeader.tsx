import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
  bgImage,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  bgImage?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20">
      {bgImage ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${bgImage})` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/95 via-[#FDFBF7]/90 to-background" />
        </>
      ) : (
        <div className="absolute inset-0 gradient-soft" />
      )}
      <div className="absolute -top-24 right-0 size-[420px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 size-[380px] rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
            {eyebrow}
          </span>
        )}

        <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
