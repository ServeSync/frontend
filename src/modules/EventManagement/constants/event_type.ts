export const eventType = [
  { id: 'Internal', name: 'Trong trường' },
  { id: 'External', name: 'Ngoài trường' },
  { id: 'Collaboration', name: 'Kết hợp' }
]

interface Type {
  [key: string]: string
}

export const TypeToMessage = (type: string) => {
  const mappedEventType: Type = {
    Internal: 'Trong trường',
    External: 'Ngoài trường',
    Collaboration: 'Kết hợp'
  }

  return mappedEventType[`${type}`]
}
