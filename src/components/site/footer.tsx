export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-4xl px-6 py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Samuel Ehret
      </div>
    </footer>
  );
}
