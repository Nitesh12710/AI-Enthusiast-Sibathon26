export function calculateROI(
  hoursSavedPerMonth: number,
  hourlyRate: number,
  numberOfEmployees: number
) {
  // Calculate monthly savings
  const monthlySavings = hoursSavedPerMonth * hourlyRate;

  // Calculate annual savings
  const annualSavings = monthlySavings * 12;

  // Calculate productivity boost percentage
  // Assuming 160 working hours per month per employee
  const totalMonthlyHours = 160 * numberOfEmployees;
  const productivityBoostPercentage = Math.round(
    (hoursSavedPerMonth / totalMonthlyHours) * 100
  );

  // Calculate automation maturity score (0-100)
  const automationMaturityScore = Math.min(
    100,
    Math.round((hoursSavedPerMonth / 100) * 50 + productivityBoostPercentage * 0.5)
  );

  return {
    hours_saved_per_month: hoursSavedPerMonth,
    monthly_savings: monthlySavings,
    annual_savings: annualSavings,
    productivity_boost_percentage: Math.min(100, productivityBoostPercentage),
    automation_maturity_score: automationMaturityScore,
    break_even_months: Math.round(5000 / monthlySavings), // Assuming $5000 setup cost
  };
}
