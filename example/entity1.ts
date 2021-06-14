function test (list: number[]) {
  const noop = (_: any) => {}
  for (const item of list) {
    noop(item)
  }
}

export { test }