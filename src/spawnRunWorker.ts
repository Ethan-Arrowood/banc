import { Worker } from "worker_threads"
import { RunInput, RunResult } from "./common"

export function spawnRunWorker (runInput: RunInput) {
  return new Promise<RunResult>((resolve, reject) => {
    const worker = new Worker('./src/worker.js', {
      workerData: {
        path: 'runWorker.ts',
        data: runInput
      }
    })

    worker.on('message', resolve)
    worker.on('error', reject)

    worker.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}