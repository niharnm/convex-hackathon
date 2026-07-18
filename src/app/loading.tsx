export default function Loading() {
  return (
    <main
      aria-live="polite"
      className="grid min-h-[60vh] place-items-center px-5"
    >
      <div className="flex items-center gap-3 text-evergreen">
        <span
          aria-hidden="true"
          className="size-3 animate-pulse rounded-full bg-amber"
        />
        <p className="font-semibold">Loading the next handoff…</p>
      </div>
    </main>
  );
}
