const CAT_ASCII = `　　　　　   __
　　　　 ／フ   フ
　　　　|  .   .|
　 　　／\`ミ__xノ
　 　 /　　 　 |
　　 /　 ヽ　　ﾉ
 　 │　　 | | |
／￣|　　 | | |
| (￣ヽ_ヽ)_)__)
＼二つ`;

export function AsciiCatSticky() {
  return (
    <div
      className={[
        "note-curl sticky-note-interactive sticky-note-interactive--pink",
        "relative flex h-[10.25rem] w-[10.25rem] shrink-0 flex-col overflow-visible rounded-sm",
        "bg-gradient-to-b from-[#fff8fb] to-[#ffeef4]",
      ].join(" ")}
    >
      <div className="tape tape-sticky-top" aria-hidden />
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-auto px-1 pb-1 pt-7">
        <div
          className="ascii-art ascii-sticky-text ascii-sticky-text--wide w-max shrink-0 whitespace-pre text-left text-stone-800 !font-mono"
          role="img"
          aria-label="ASCII art of a cat"
        >
          {CAT_ASCII}
        </div>
      </div>
    </div>
  );
}
