
import axios from 'axios'

export async function extractCodeFromImage(file: File) {
  const url = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr'
  // const data = JSON.stringify({url: fileUrl})
  const data = file
  const params = { language: "unk",  detectOrientation: "true" }
  const headers = {
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': '120c13aa28944c9f8472bfbdc600c907' }
  
  let response
  try {
    response = await axios.post(url, data, { params, headers })
  } catch(e) {
    console.log('xxx', e)
  }

  const results: string[] = []
  if (response) {
    for (let region of response.data.regions) {
      for (let line of region.lines) {
        for (let word of line.words) {
          results.push(word.text)
        }
      }
    }
  }
  const text = results.join(' ')
  console.log('results>', text)

  const match = text.match(/\/\/\/([0-9A-Z]+)\/\/\//g)
  if (match && match.length) {
    return match.slice(-1)[0].replace(/\//g, '')
  }
}