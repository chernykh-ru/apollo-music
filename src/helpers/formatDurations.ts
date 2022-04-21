//Convert seconds to format hh:mm:ss string
export const formatDuration = (seconds: number): string => {
  return new Date(seconds * 1000).toISOString().slice(11, 19)
}
