import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { getPrizeGlowColor } from "@/components/PrizesSection";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("uses the gold glow for the 1ST prize", () => {
    expect(getPrizeGlowColor("1ST")).toBe("rgba(252, 220, 95,0.45)");
    expect(getPrizeGlowColor("2ND")).toBe("rgba(255, 110, 230,0.5)");
  });
});
