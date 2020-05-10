export type Sequence = string
export type Base = 'A' | 'T' | 'C' | 'G'
export type Enzyme = {
  name: string
  recognitionSite: Sequence
  cutOffset: number
}
export type RecognitionSite = {
  enzyme: Enzyme
  cutOffset: number
}
