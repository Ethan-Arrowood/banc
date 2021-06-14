import { parentPort, workerData, MessagePort } from 'worker_threads'
import { Entity, RunInput, Script } from './common'

const {
  data: {
    entity,
    suite,
    before,
    main,
    after
  }
} = workerData as { data: RunInput }

const getEntity = async (entity: Entity) => {
  const module = await import(entity.path)
  const entityImport = module[entity.import]
  return entityImport
}

const runScript = async (script?: Script, additionalArgs: unknown[] = []) => {
  if (!script) return
  const module = await import(script.path)
  const callable = module[script.import]
  return callable(...script.args ?? [], ...additionalArgs)
}

async function run (parentPort: MessagePort) {
  const entityImport = await getEntity(entity)

  const beforeResult = await runScript(before, [entityImport])

  const startTime = process.hrtime.bigint()

  const mainResult = await runScript(main, [entityImport, beforeResult])

  const endTime = process.hrtime.bigint()

  const afterResult = await runScript(after, [entityImport, mainResult])

  parentPort.postMessage({
    entity,
    suite,
    afterResult,
    timings: {
      startTime,
      endTime
    }
  })
}

if (parentPort === null) {
  throw new Error('This script must be executed as a worker_thread. parentPort is null')
}

run(parentPort)