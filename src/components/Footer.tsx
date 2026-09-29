import { CONTACT_EMAIL } from "../data/contact";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl shrink-0 border-t border-white/15 px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
      <div className="flex flex-col justify-between gap-4 text-sm sm:flex-row sm:flex-wrap sm:items-center">
        <p className="text-zinc-400">Midhat Ratib Khan</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-zinc-200">
          <a href={`mailto:${CONTACT_EMAIL}`} className="break-all underline underline-offset-4 hover:text-white">{CONTACT_EMAIL}</a>
          <a href="https://github.com/son1cleo" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">GitHub</a>
          <a href="https://linkedin.com/in/midhat-ratib-khan-9969012bb" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
