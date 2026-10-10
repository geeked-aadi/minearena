export function SectionSeam() {
  return (
    <div className="relative z-20 h-0">
      <div
        aria-hidden="true"
        className="pointer-events-none w-full aspect-[1266/110] -translate-y-1/2 bg-no-repeat"
        style={{
          backgroundImage: `url("/wooden_seam.png")`,
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}
