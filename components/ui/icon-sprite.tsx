/* Sprite SVG des icônes, rendu une seule fois dans le layout.
 * Utilisation : <Icon name="phone" /> (components/ui/icon.tsx). */
export default function IconSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="hidden"
      aria-hidden="true"
    >
      <defs>
        <symbol id="i-house" viewBox="0 0 24 24">
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-5a2 2 0 0 1 4 0v5" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="M20 6 9 17l-5-5" />
        </symbol>
        <symbol id="i-check-circle" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="m8 12 3 3 5-6" />
        </symbol>
        <symbol id="i-crack" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="m12 3-2 6 4 3-3 9" />
        </symbol>
        <symbol id="i-house-search" viewBox="0 0 24 24">
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10v10h14V10" />
          <circle cx="12" cy="14" r="3" />
          <path d="m14.2 16.2 2.3 2.3" />
        </symbol>
        <symbol id="i-scales" viewBox="0 0 24 24">
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M5 7 2 14a3 3 0 0 0 6 0z" />
          <path d="m19 7-3 7a3 3 0 0 0 6 0z" />
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </symbol>
        <symbol id="i-award" viewBox="0 0 24 24">
          <circle cx="12" cy="9" r="6" />
          <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
        </symbol>
        <symbol id="i-doc" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6M9 17h4" />
        </symbol>
        <symbol id="i-chat" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </symbol>
        <symbol id="i-person" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </symbol>
        <symbol id="i-chevron" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" />
        </symbol>
        <symbol id="i-search" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </symbol>
        <symbol id="i-bar" viewBox="0 0 448 512">
          <path fill="currentColor" stroke="none" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
        </symbol>
      </defs>
    </svg>
  );
}
