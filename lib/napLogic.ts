export interface NapRecommendation {
  shouldNap: boolean;
  recommendedDuration: number;
  minDuration: number;
  maxDuration: number;
  reason: string;
  warning?: string;
}

export interface NapInput {
  currentHour: number;
  tirednessLevel: number; // 1-10 scale
  age: number;
}

export function getNapRecommendation(input: NapInput): NapRecommendation {
  const { currentHour, tirednessLevel, age } = input;

  // Base nap duration by age (in minutes)
  const getBaseDuration = (age: number): number => {
    if (age < 2) return 90;
    if (age < 5) return 60;
    if (age < 12) return 45;
    if (age < 18) return 30;
    if (age < 40) return 20;
    if (age < 65) return 25;
    return 30;
  };

  // Adjust duration based on tiredness (1-10 scale)
  const getTirednessFactor = (tiredness: number): number => {
    return 0.7 + (tiredness / 10) * 0.6; // Range: 0.7 to 1.3
  };

  const baseDuration = getBaseDuration(age);
  const tirednessFactor = getTirednessFactor(tirednessLevel);
  const adjustedDuration = Math.round(baseDuration * tirednessFactor);

  // Time-based logic
  const shouldNapBasedOnTime = (): { should: boolean; reason: string; warning?: string } => {
    // Too early (before 11 AM)
    if (currentHour < 11) {
      return {
        should: tirednessLevel >= 7,
        reason: tirednessLevel >= 7
          ? "You're very tired, but napping too early might affect your sleep schedule."
          : "It's too early for a nap. Try to power through or get some fresh air.",
        warning: tirednessLevel >= 7 ? "Keep nap under 20 minutes to avoid grogginess." : undefined
      };
    }

    // Optimal nap window (11 AM - 3 PM)
    if (currentHour >= 11 && currentHour < 15) {
      return {
        should: tirednessLevel >= 4,
        reason: tirednessLevel >= 4
          ? "Perfect time for a nap! You're in the optimal nap window."
          : "You're not tired enough to need a nap right now."
      };
    }

    // Late afternoon (3 PM - 5 PM)
    if (currentHour >= 15 && currentHour < 17) {
      return {
        should: tirednessLevel >= 6,
        reason: tirednessLevel >= 6
          ? "You can nap, but keep it short to avoid interfering with nighttime sleep."
          : "Too late in the day for a nap unless you're very tired.",
        warning: "Keep it under 20 minutes to avoid sleep issues tonight."
      };
    }

    // Evening/Night (after 5 PM)
    return {
      should: false,
      reason: "Too late for a nap. It will interfere with your nighttime sleep. Consider going to bed earlier instead.",
      warning: "Napping now will likely cause insomnia."
    };
  };

  const timeCheck = shouldNapBasedOnTime();
  const shouldNap = timeCheck.should;

  // Calculate duration ranges
  let recommendedDuration = adjustedDuration;
  let minDuration = Math.max(10, Math.round(adjustedDuration * 0.7));
  let maxDuration = Math.round(adjustedDuration * 1.5);

  // Cap maximum nap duration to avoid sleep inertia
  if (maxDuration > 90) maxDuration = 90;

  // Special case: power nap for late afternoon
  if (currentHour >= 15 && shouldNap) {
    recommendedDuration = Math.min(recommendedDuration, 20);
    maxDuration = 25;
  }

  // Avoid entering deep sleep (keep under 30 min) unless very young or elderly
  if (age >= 12 && age < 65 && recommendedDuration > 30 && recommendedDuration < 90) {
    maxDuration = 30;
    if (recommendedDuration > 30) {
      recommendedDuration = 20; // Power nap to avoid grogginess
    }
  }

  // Allow longer naps for children and elderly if tired enough
  if ((age < 12 || age >= 65) && tirednessLevel >= 7) {
    maxDuration = 90;
  }

  return {
    shouldNap,
    recommendedDuration,
    minDuration,
    maxDuration,
    reason: timeCheck.reason,
    warning: timeCheck.warning
  };
}
