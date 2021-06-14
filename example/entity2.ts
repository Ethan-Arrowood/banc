function test (list: number[]) {
  const noop = (_: any) => {}
  for (let i = 0; i < list.length; i++) {
    noop(list[i])
  }
}

export { test }