const roles = [
  { name: "Backend developer intern", detail: "Remote, flexible hours." },
  { name: "Frontend developer intern", detail: "Remote, flexible hours." },
  { name: "UI/UX designer intern", detail: "Remote, flexible hours." }
];

export default function Careers() {
  return (
    <main className="section container-narrow">
      <h1 className="max-w-2xl text-[36px] font-semibold tracking-tightest sm:text-[46px]">
        Careers
      </h1>
      <p className="mt-4 max-w-xl text-[16px] text-textMuted">
        We hire interns on a rolling basis. Send your CV and a short note on
        what you want to work on.
      </p>

      <div className="mt-12 divide-y divide-border border-t border-border">
        {roles.map((r) => (
          <div key={r.name} className="flex items-center justify-between py-6">
            <div>
              <p className="text-[16px] font-medium">{r.name}</p>
              <p className="mt-1 text-[14px] text-textMuted">{r.detail}</p>
            </div>
            <a
              href="mailto:onetyoneg@gmail.com?subject=Internship application"
              className="text-[14px] text-accent hover:underline"
            >
              Apply
            </a>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-surface p-8">
        <p className="text-[16px] font-medium">Online courses & internship program</p>
        <p className="mt-2 max-w-md text-[14px] text-textMuted">
          Beginner-friendly courses in web development and related skills,
          with an internship track for those who complete them.
        </p>
      </div>
    </main>
  );
}
