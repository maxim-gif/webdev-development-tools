export function getRandomCards(arr, n) {
    let result = []
    n /= 2
    for (let i = 0; i < n && arr.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * arr.length)
        const randomElement = arr.splice(randomIndex, 1)

        result.push(randomElement[0])
    }

    result = [...result, ...result]

    result = result.sort(() => Math.random() - 0.5)

    result = result.map((element, index) => {
        return { name: element, index: index }
    })

    return result
}
