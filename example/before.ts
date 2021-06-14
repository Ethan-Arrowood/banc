export function before (listLength: number) {
  const list = []
  for (let i = 0; i < listLength; i++) {
    list.push(i)
  }
  return list
}