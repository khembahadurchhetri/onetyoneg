import CareerApplicationForm from "@/components/CareerApplicationForm";

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
          <div key={r.name} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[16px] font-medium">{r.name}</p>
              <p className="mt-1 text-[14px] text-textMuted">{r.detail}</p>
            </div>
            <a href="#apply" className="text-[14px] text-accent hover:underline">
              Apply
            </a>
          </div>
        ))}
      </div>

      <div id="apply" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tightest">Apply to join the team</h2>
        <p className="mt-2 max-w-xl text-sm text-textMuted">
          Your application is saved to our private admin inbox and sent to our team by email.
        </p>
        <CareerApplicationForm roles={roles.map((role) => role.name)} />
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
