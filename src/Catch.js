export function initCatch() {
    if (!localStorage.getItem('catch')) {
        localStorage.setItem('catch', JSON.stringify({}))
    }
}

export function grabCatchObj() {
    const Catch = localStorage.getItem('catch')
    return JSON.parse(Catch)
}

export function grabCatch(key) {
    const Catch = grabCatchObj()
    return Catch[key]
}

export function storeCatch(key, data) {
    const Catch = grabCatchObj()
    Catch[key] = data
    localStorage.setItem('catch', JSON.stringify(Catch))
}

export function catchEmpty() {
    const Catch = grabCatchObj()
    return Object.keys(Catch).length == 0
}

export function isCatched(key) {
    const Catch = grabCatchObj()
    return key in Catch
}

export function clearCatch() {
    localStorage.removeItem('catch')
}

export default initCatch