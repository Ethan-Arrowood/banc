import { BenchmarkResult, Run, Timings } from "./common"

export async function banc (runs: Run[], baselineEntityId: string) {
  const runResults = await Promise.all(runs)

  const benchmarkResult: BenchmarkResult = new Map()
  for (const result of runResults) {
    let suite = benchmarkResult.get(result.suite.id)
    if (suite === undefined) {
      suite = new Map()
      benchmarkResult.set(result.suite.id, suite)
    }
    suite.set(result.entity.id, result)
  }

  console.log(`Benchmark Results`)

  for (const [suiteId, suite] of benchmarkResult) {
    const baselineRun = suite.get(baselineEntityId)
    if (baselineRun === undefined) {
      throw new Error(`Cannot find baseline run with entity id: ${baselineEntityId}`)
    }
    const baselineTime = calcElapsedTime(baselineRun.timings)
    const output = []
    for (const [entityId, run] of suite) {
      const totalTime = calcElapsedTime(run.timings)
      const percentChange = entityId === baselineEntityId ?
        null : calcPercentChange(baselineTime, totalTime)
      output.push({
        'Entity': entityId,
        'Total Time': totalTimeToString(totalTime),
        'Percent Change': percentChange === null ? '0.000%' : percentChangeToString(percentChange)
      })
    }
    console.table(output)
  }
}

function calcElapsedTime (timings: Timings) {
  return Number.parseFloat((timings.endTime - timings.startTime).toString())
}

function calcPercentChange (baseTime: number, elapsedTime: number) {
  return ((elapsedTime - baseTime) / baseTime) * 100
}

function totalTimeToString (totalTime: number) {
  return `${totalTime}ns (${(totalTime * 0.000001).toFixed(3)}ms)`
}

function percentChangeToString (percentChange: number) {
  return `${percentChange.toFixed(3)}%`
}