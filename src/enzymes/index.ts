import { Enzyme } from '../types'

// Keep in alphabetical order
const ENZYMES: { [name: string]: Enzyme } = {
  bamhi: {
    recognitionSite: 'GGATCC',
    cutOffset: 1,
    name: 'BamHI',
  },
  ecori: {
    recognitionSite: 'GAATTC',
    cutOffset: 1,
    name: 'EcoRI',
  },
  hindiii: {
    recognitionSite: 'AAGCTT',
    cutOffset: 1,
    name: 'HindIII',
  },
}

// Access methods
export const getEnzyme = (enzymeName: string): Enzyme => {
  if (typeof enzymeName !== 'string') {
    throw new TypeError('enzymeName must be a string')
  }

  return ENZYMES[enzymeName.toLowerCase()]
}

export const getEnzymes = (enzymeNames: Array<string>): Array<Enzyme> => {
  if (!Array.isArray(enzymeNames)) {
    throw new TypeError('enzymeNames must be an array')
  }

  return enzymeNames.reduce((enzymes: Array<Enzyme>, name) => {
    const enzyme = getEnzyme(name)

    enzyme && enzymes.push(enzyme)
    return enzymes
  }, [])
}

export const getAllEnzymes = (): Array<Enzyme> => Object.values(ENZYMES)
