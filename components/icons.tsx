function base(children: React.ReactNode) {
  return (
    <svg
      width="88"
      height="88"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function CodeIcon() {
  return base(
    <>
      <polyline points="9 8 5 12 9 16" />
      <polyline points="15 8 19 12 15 16" />
    </>
  );
}

export function MegaphoneIcon() {
  return base(
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5l-5 4H5a1 1 0 0 0-1 1Z" />
      <path d="M17 8a4 4 0 0 1 0 8" />
    </>
  );
}

export function StorefrontIcon() {
  return base(
    <>
      <path d="M4 9l1-4h14l1 4" />
      <path d="M4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
      <path d="M5 9v9h14V9" />
    </>
  );
}

export function DocumentIcon() {
  return base(
    <>
      <path d="M7 3h7l3 3v15H7Z" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="15" y2="14" />
      <line x1="9" y1="18" x2="13" y2="18" />
    </>
  );
}
