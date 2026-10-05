export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container-narrow flex flex-col items-center gap-4 py-10 text-[13px] text-textMuted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} 1T1G. One Team One Goal.</p>
        <div className="flex gap-5">
          <a href="https://instagram.com/onetyoneg" className="hover:text-text">
            Instagram
          </a>
          <a href="https://www.facebook.com/profile.php?id=61593834707142" className="hover:text-text">
            Facebook
          </a>
          <a 
            href="mailto:onetyoneg@gmail.com?subject=Inquiry%20from%20Website&body=Hi%201T1G,%0D%0A%0D%0AI%20would%20like%20to%20reach%20out%20regarding..." 
            className="hover:text-text"
          >
            Email
          </a>
          <a href="https://www.linkedin.com/in/one-tyone-04322a441?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="hover:text-text">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}