import { useState, useEffect } from 'react';

export function useHBMetrics() {
  const [metrics, setMetrics] = useState({
    hoursSaved: 0,
    costSaved: 0,
    documents: 0,
    accuracy: 0
  });

  useEffect(() => {
    // Animate metrics on mount
    const timer = setTimeout(() => {
      setMetrics({
        hoursSaved: 8800,
        costSaved: 7000000,
        documents: 45000,
        accuracy: 99.2
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const calculateROI = (hours: number) => {
    const hourlyRate = 350;
    return hours * hourlyRate;
  };

  const projectAdoption = (current: number) => {
    // HB's current 43% to target 78%
    return current * 1.81;
  };

  return {
    metrics,
    calculateROI,
    projectAdoption,
    hbCaseStudies: {
      kira: {
        before: "400+ hours",
        after: "4 hours",
        savings: "99% reduction"
      },
      copilot: {
        before: "Manual",
        after: "8,800 hours saved",
        savings: "$3.1M/year"
      }
    }
  };
}