function test (list: number[]) {
  const noop = (_: any) => {}
  list.forEach(item => {
    noop(item)
  })
}

export { test }