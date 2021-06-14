export interface Script<Args = unknown> {
  path: string;
  args?: Args[];
  import: string;
}

export interface Entity {
  id: string;
  path: string;
  import: string;
  name?: string;
  description?: string;
}

export interface Suite {
  id: string;
  name?: string;
  description?: string;
}

export interface RunInput {
  entity: Entity;
  suite: Suite;
  before?: Script;
  main: Script;
  after?: Script;
}

export interface Timings {
  startTime: bigint;
  endTime: bigint;
}

export interface RunResult {
  entity: Entity;
  suite: Suite;
  timings: Timings;
}

export type SuiteResult = Map<string, RunResult>
export type BenchmarkResult = Map<string, SuiteResult>

export type Run = Promise<RunResult>
