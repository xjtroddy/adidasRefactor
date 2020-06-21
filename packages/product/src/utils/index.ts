import fetch from 'node-fetch'

export async function requestGet (url: string) {
  try {
    const result = (await fetch(url)).json()
    return result
  } catch (e) {
    console.error(e.message)
    throw e
  }
}
