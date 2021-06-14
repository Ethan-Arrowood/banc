import path from "path";
import { banc } from "../src";
import { spawnRunWorker } from "../src/spawnRunWorker";

const entities = ['entity1', 'entity2', 'entity3']

const listLength = 10

const suite1 = (entityId: string) => spawnRunWorker({
  entity: {
    id: entityId,
    path: path.join(__dirname, `${entityId}.ts`),
    import: 'test'
  },
  suite: { id: 'suite1' },
  before: {
    path: path.join(__dirname, 'before.ts'),
    import: 'before',
    args: [ listLength ]
  },
  main: {
    path: path.join(__dirname, 'main.ts'),
    import: 'main'
  }
})

const suites = [ suite1 ]

const runs = entities.map(entityName => suites.map(suite => suite(entityName))).flat()

banc(runs, 'entity1')