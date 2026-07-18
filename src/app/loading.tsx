export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="section-shell py-12 sm:py-16"
    >
      <span className="sr-only">Loading Vun</span>
      <div className="mx-auto max-w-4xl animate-pulse" aria-hidden="true">
        <div className="h-3 w-28 rounded bg-brand/20" />
        <div className="mt-4 h-10 w-3/4 rounded-lg bg-muted sm:h-12" />
        <div className="mt-3 h-5 w-1/2 rounded bg-muted" />
        <div className="mt-8 rounded-xl border border-border bg-white p-5 sm:p-7">
          <div className="h-5 w-40 rounded bg-muted" />
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div className="space-y-3" key={item}>
                <div className="size-8 rounded-full bg-muted" />
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
