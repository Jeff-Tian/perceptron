export function findS(samples: any[], concept: string, attributes: string[]) {
  const h = {}
  attributes.map(v => h[v] = null);

  samples.map((value, index, array) => {
    if (value[concept] === 'Yes') {
      attributes.map(a => {
        if (value[a] !== h[a]) {
          h[a] = h[a] === null ? value[a] : '?'
        }
      })
    }
  })

  return h;
}