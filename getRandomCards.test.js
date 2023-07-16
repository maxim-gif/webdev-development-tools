const { getRandomCards } = require('./function')
const { arrCards } = require('./storagedata')
const { it, expect, describe } = require('@jest/globals')
const sizeArray = 6
describe('getRandomCards', () => {
    it('should return array', () => {
        const result = getRandomCards(arrCards, sizeArray)

        // Проверить, что возвращается массив
        expect(Array.isArray(result)).toBe(true)
    })
    it('should return array of required length', () => {
        const result = getRandomCards(arrCards, sizeArray)

        // Проверить, что возвращается массив необходимой длины
        expect(result.length).toBe(sizeArray)
    })
})
