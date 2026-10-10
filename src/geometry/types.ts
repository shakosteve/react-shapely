export interface Field {
  name: string;
  label: string;
}

export type SolveResult<K extends string = string> =
  | { ok: true; values: Record<K, number> }
  | { ok: false; message: string };

export interface Shape {
  label: string;
  hint: string;
  fields: readonly Field[];
  solve: (values: Partial<Record<string, number>>) => SolveResult;
}

export const solved = <K extends string>(values: Record<K, number>): SolveResult<K> => ({
  ok: true,
  values
});

export const failed = (message: string): { ok: false; message: string } => ({
  ok: false,
  message
});
