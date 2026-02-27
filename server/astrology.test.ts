import { describe, it, expect } from "vitest";
import {
  generateAstrologyProfile,
  generateAstrologyExecutiveSummary,
} from "./astrology";

describe("Astrology Service", () => {
  it("should generate astrology profile for a given birth date", () => {
    const birthData = {
      date: new Date(1990, 2, 15), // 15 de março de 1990
      time: "14:30",
      latitude: -23.5505,
      longitude: -46.6333,
      timezone: -3,
      isDaylightSaving: false,
    };

    const profile = generateAstrologyProfile(birthData);

    expect(profile).toBeDefined();
    expect(profile.sunSign).toBe("Peixes"); // 15 de março é Peixes
    expect(profile.moonSign).toBeDefined();
    expect(profile.ascendant).toBeDefined();
    expect(profile.personalityProfile).toBeDefined();
    expect(profile.strengths.length).toBeGreaterThan(0);
    expect(profile.challenges.length).toBeGreaterThan(0);
    expect(profile.recommendations).toHaveLength(3);
  });

  it("should identify Áries for March 21 - April 19", () => {
    const birthData = {
      date: new Date(1990, 3, 1), // 1 de abril de 1990
      time: "12:00",
      latitude: -23.5505,
      longitude: -46.6333,
      timezone: -3,
      isDaylightSaving: false,
    };

    const profile = generateAstrologyProfile(birthData);
    expect(profile.sunSign).toBe("Áries");
  });

  it("should identify Touro for April 20 - May 20", () => {
    const birthData = {
      date: new Date(1990, 4, 10), // 10 de maio de 1990
      time: "12:00",
      latitude: -23.5505,
      longitude: -46.6333,
      timezone: -3,
      isDaylightSaving: false,
    };

    const profile = generateAstrologyProfile(birthData);
    expect(profile.sunSign).toBe("Touro");
  });

  it("should identify Leão for July 23 - August 22", () => {
    const birthData = {
      date: new Date(1990, 7, 15), // 15 de agosto de 1990
      time: "12:00",
      latitude: -23.5505,
      longitude: -46.6333,
      timezone: -3,
      isDaylightSaving: false,
    };

    const profile = generateAstrologyProfile(birthData);
    expect(profile.sunSign).toBe("Leão");
  });

  it("should generate executive summary with all sections", () => {
    const birthData = {
      date: new Date(1990, 2, 15),
      time: "14:30",
      latitude: -23.5505,
      longitude: -46.6333,
      timezone: -3,
      isDaylightSaving: false,
    };

    const profile = generateAstrologyProfile(birthData);
    const summary = generateAstrologyExecutiveSummary(profile);

    expect(summary).toContain("Seu Perfil Astrológico");
    expect(summary).toContain("Signo Solar");
    expect(summary).toContain("Signo Lunar");
    expect(summary).toContain("Ascendente");
    expect(summary).toContain("Sua Personalidade");
    expect(summary).toContain("Seus Pontos Fortes");
    expect(summary).toContain("Áreas de Desenvolvimento");
    expect(summary).toContain("Recomendações Personalizadas");
  });

  it("should have strengths and challenges for each zodiac sign", () => {
    const signs = [
      { date: new Date(1990, 2, 25), sign: "Áries" }, // Áries
      { date: new Date(1990, 4, 10), sign: "Touro" }, // Touro
      { date: new Date(1990, 5, 10), sign: "Gêmeos" }, // Gêmeos
      { date: new Date(1990, 6, 10), sign: "Câncer" }, // Câncer
      { date: new Date(1990, 7, 15), sign: "Leão" }, // Leão
      { date: new Date(1990, 8, 10), sign: "Virgem" }, // Virgem
      { date: new Date(1990, 9, 10), sign: "Libra" }, // Libra
      { date: new Date(1990, 10, 10), sign: "Escorpião" }, // Escorpião
      { date: new Date(1990, 11, 10), sign: "Sagitário" }, // Sagitário
      { date: new Date(1991, 0, 10), sign: "Capricórnio" }, // Capricórnio
      { date: new Date(1991, 1, 10), sign: "Aquário" }, // Aquário
      { date: new Date(1991, 2, 10), sign: "Peixes" }, // Peixes
    ];

    for (const { date, sign } of signs) {
      const birthData = {
        date,
        time: "12:00",
        latitude: -23.5505,
        longitude: -46.6333,
        timezone: -3,
        isDaylightSaving: false,
      };

      const profile = generateAstrologyProfile(birthData);

      expect(profile.sunSign).toBe(sign);
      expect(profile.strengths.length).toBeGreaterThan(0);
      expect(profile.challenges.length).toBeGreaterThan(0);
      expect(profile.recommendations.length).toBeGreaterThan(0);
    }
  });
});
