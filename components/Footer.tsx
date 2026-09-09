export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container-narrow flex flex-col items-center gap-4 py-10 text-[13px] text-textMuted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} 1T1G. Build a brighter tomorrow.</p>
        <div className="flex gap-5">
          <a href="https://instagram.com/onetyoneg" className="hover:text-text">
            Instagram
          </a>
          <a href="https://facebook.com/1T1G" className="hover:text-text">
            Facebook
          </a>
          <a href="mailto:onetyoneg@gmail.com" className="hover:text-text">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
