// The shape drawn by components/AnalysisPreview.astro (fix step 3, 3 Nov 2026): real values with no axis value, either
// lines (each series, the accent one in green) or bars (from 0, or around `base`; the accent indices in green).
export type Shape = { kind: "lines"; series: { values: (number | null)[]; accent?: boolean }[] } | { kind: "bars"; values: number[]; accent?: number[]; base?: number };
