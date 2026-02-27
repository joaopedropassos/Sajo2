import { describe, it, expect } from "vitest";
import { findRelevantParadigms, getParadigm, paradigmsCatalog } from "@shared/paradigms";

describe("FUSION-SAJO Paradigms", () => {
  it("should load all paradigms from catalog", () => {
    expect(Object.keys(paradigmsCatalog).length).toBe(20);
    expect(paradigmsCatalog.V01).toBeDefined();
    expect(paradigmsCatalog.V20).toBeDefined();
  });

  it("should get paradigm by ID", () => {
    const paradigm = getParadigm("V01");
    expect(paradigm).toBeDefined();
    expect(paradigm?.id).toBe("V01");
    expect(paradigm?.area).toBe("vida");
    expect(paradigm?.actions7d.length).toBeGreaterThan(0);
  });

  it("should return undefined for non-existent paradigm", () => {
    const paradigm = getParadigm("V99");
    expect(paradigm).toBeUndefined();
  });

  it("should identify V01 (subsistence crisis) when cashflow_severity >= 8 and stress >= 6", () => {
    const userState = {
      cashflow_severity: 8,
      stress: 6,
    };
    const paradigms = findRelevantParadigms(userState);
    expect(paradigms).toContain("V01");
  });

  it("should not identify V01 when conditions are not met", () => {
    const userState = {
      cashflow_severity: 5,
      stress: 3,
    };
    const paradigms = findRelevantParadigms(userState);
    expect(paradigms).not.toContain("V01");
  });

  it("should identify V03 (burnout) when sleep <= 4 and stress >= 7", () => {
    const userState = {
      sleep: 3,
      stress: 8,
    };
    const paradigms = findRelevantParadigms(userState);
    expect(paradigms).toContain("V03");
  });

  it("should identify V05 (low support network) when support_network <= 3", () => {
    const userState = {
      support_network: 2,
    };
    const paradigms = findRelevantParadigms(userState);
    expect(paradigms).toContain("V05");
  });

  it("should identify multiple paradigms when multiple conditions are met", () => {
    const userState = {
      cashflow_severity: 9,
      stress: 8,
      sleep: 3,
      support_network: 2,
    };
    const paradigms = findRelevantParadigms(userState);
    expect(paradigms.length).toBeGreaterThan(1);
    expect(paradigms).toContain("V01");
    expect(paradigms).toContain("V03");
    expect(paradigms).toContain("V05");
  });

  it("should have actions for each paradigm", () => {
    for (const paradigm of Object.values(paradigmsCatalog)) {
      expect(paradigm.actions7d).toBeDefined();
      expect(Array.isArray(paradigm.actions7d)).toBe(true);
      expect(paradigm.actions7d.length).toBeGreaterThan(0);

      expect(paradigm.actions90d).toBeDefined();
      expect(Array.isArray(paradigm.actions90d)).toBe(true);
      expect(paradigm.actions90d.length).toBeGreaterThan(0);
    }
  });

  it("should have avoid list for each paradigm", () => {
    for (const paradigm of Object.values(paradigmsCatalog)) {
      expect(paradigm.avoid).toBeDefined();
      expect(Array.isArray(paradigm.avoid)).toBe(true);
    }
  });

  it("should have output blocks for each paradigm", () => {
    for (const paradigm of Object.values(paradigmsCatalog)) {
      expect(paradigm.outputBlocks).toBeDefined();
      expect(Array.isArray(paradigm.outputBlocks)).toBe(true);
      expect(paradigm.outputBlocks.length).toBeGreaterThan(0);
    }
  });

  it("should identify V17 (positive momentum) when clarity >= 7 and momentum >= 6", () => {
    const userState = {
      clarity: 8,
      momentum: 7,
    };
    const paradigms = findRelevantParadigms(userState);
    expect(paradigms).toContain("V17");
  });

  it("should identify V20 (celebration) when achievement >= 7 and satisfaction >= 7", () => {
    const userState = {
      achievement: 8,
      satisfaction: 8,
    };
    const paradigms = findRelevantParadigms(userState);
    expect(paradigms).toContain("V20");
  });
});
