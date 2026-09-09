import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <main className="section container-narrow">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-[36px] font-semibold tracking-tightest sm:text-[46px]">
          Get a quote
        </h1>
        <p className="mt-4 text-[16px] text-textMuted">
          Tell us what you need. For a faster reply, message us directly on{" "}
          <a href="https://instagram.com/onetyoneg" className="text-accent hover:underline">
            Instagram
          </a>{" "}
          or{" "}
          <a href="https://facebook.com/1T1G" className="text-accent hover:underline">
            Facebook
          </a>
          .
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md">
        <ContactForm />
      </div>
    </main>
  );
}
