import { getEnzyme, getEnzymes, getAllEnzymes } from '..'

describe('getEnzyme', () => {
  describe('when an extant enzyme name is passed', () => {
    it('retreives an enzyme from the db', () => {
      expect(getEnzyme('hindiii')).toEqual({
        recognitionSite: 'AAGCTT',
        cutOffset: 1,
        name: 'HindIII',
      })
    })

    it('is case insensitive', () => {
      expect(getEnzyme('hindiii')).toEqual(getEnzyme('HINDIII'))
    })
  })

  describe('when a bad name is passsed', () => {
    it('returns undefined', () => {
      expect(getEnzyme('derp derp')).toEqual(undefined)
    })
  })

  describe('when a non-string is passed', () => {
    it('throws a type error', () => {
      ;[true, {}, [], 1].forEach((badType) => {
        expect(() => getEnzyme(badType as any)).toThrowError(TypeError)
      })
    })
  })
})

describe('getEnzymes', () => {
  describe('when passed an array of enzyme names', () => {
    it('returns an array of enzymes matching those names', () => {
      expect(getEnzymes(['ecori', 'hindiii'])).toEqual([
        {
          recognitionSite: 'GAATTC',
          cutOffset: 1,
          name: 'EcoRI',
        },
        {
          recognitionSite: 'AAGCTT',
          cutOffset: 1,
          name: 'HindIII',
        },
      ])
    })

    it('is case insensitive', () => {
      expect(getEnzymes(['hincii'])).toEqual(getEnzymes(['HincII']))
    })
  })

  describe('when a non-existant enzyme name is passed', () => {
    it('returns only results for correct/present names', () => {
      expect(getEnzymes(['hindiii', 'derp derp'])).toEqual([
        {
          recognitionSite: 'AAGCTT',
          cutOffset: 1,
          name: 'HindIII',
        },
      ])

      expect(getEnzymes(['derp derp', 'not present'])).toEqual([])
    })
  })

  describe('when bad data are passed', () => {
    describe('when argument is not an array', () => {
      it('throws a type error', () => {
        ;[true, {}, 1].forEach((badType) => {
          expect(() => getEnzymes(badType as any)).toThrowError(TypeError)
        })
      })
    })

    describe('when the argument array contains a non-string', () => {
      it('throws a type error', () => {
        ;[true, {}, [], 1].forEach((badType) => {
          expect(() => getEnzymes(['hincii', badType as any])).toThrowError(
            TypeError
          )
        })
      })
    })
  })
})

describe('getAllEnzymes', () => {
  const mockEnzymes = [
    {
      recognitionSite: 'GGATCC',
      cutOffset: 1,
      name: 'BamHI',
    },
  ]

  jest.spyOn(Object, 'values').mockReturnValue(mockEnzymes)

  it('returns an array containing all enzymes in the db', () => {
    expect(getAllEnzymes()).toEqual(mockEnzymes)
  })
})
