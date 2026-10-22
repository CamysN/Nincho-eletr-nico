import { useEffect, useState } from 'react'
import './App.css'
import sealImage from './assets/selo-logo.png'
import qrCodeImage from './assets/qrCode.svg'
import image01 from './assets/cartaz01.png'
import image02 from './assets/cartaz02.jpg'
import image03 from './assets/cartaz03.jpg'
import image04 from './assets/cartaz04.jpg'


const DISPLAY_DURATION = 10_000
const TRANSITION_DURATION = 1_200

/* Regra de quebra de frase a cada 20 caracteres, preservando palavras:
const wrapText = (text, maxChars = 20) => {
  const words = text.trim().split(/\s+/)
  if (Array.from(text).length <= maxChars) return text

  const lines = []
  let currentLine = ''

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word

    if (currentLine && Array.from(candidate).length > maxChars) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = candidate
    }
  }

  if (currentLine) lines.push(currentLine)

  return lines.join('\n')
}
*/

// Replace this example data with the list returned by the management system.
/* const posters = [
  {
    id: 'cartaz-exemplo',
    image: image01,
    text: '25/10 às 18:30',
    alt: 'Cartaz da atração',
  },
  {
    id: 'cartaz-exemplo',
    image: image02,
    text: '05/10 às 02:30',
    alt: 'Cartaz da atração',
  },
  {
    id: 'cartaz-exemplo',
    image: image03,
    text: '31/12 às 15:00',
    alt: 'Cartaz da atração',
  },
  {
    id: 'cartaz-exemplo',
    image: image04,
    text: '10/01 às 08:15',
    alt: 'Cartaz da atração',
  },
] */

const posters = [
  {
    id: 'cartaz-exemplo',
    image: image01,
    qrCode: qrCodeImage,
    text: 'Toda semana de quinta a domingo ás 18:30',
    alt: 'Cartaz da atração',
  },
  {
    id: 'cartaz-exemplo',
    image: image02,
    qrCode: qrCodeImage,
    text: 'Toda semana de sexta a domingo',
    alt: 'Cartaz da atração',
  },
  {
    id: 'cartaz-exemplo',
    image: image03,
    qrCode: qrCodeImage,
    text: '31/12 às 15:00 e 10/01 às 08:15 e 10/01 às 08:15',
    alt: 'Cartaz da atração',
  },
  {
    id: 'cartaz-exemplo',
    image: image04,
    qrCode: qrCodeImage,
    text: '10/01 às 08:15',
    alt: 'Cartaz da atração',
  },
]

export default function App() {
  const [displayIndex, setDisplayIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPreviousIndex(displayIndex)
      setDisplayIndex(displayIndex + 1)
    }, DISPLAY_DURATION)

    return () => window.clearTimeout(timeoutId)
  }, [displayIndex])

  useEffect(() => {
    if (previousIndex === null) return undefined

    const timeoutId = window.setTimeout(() => {
      setPreviousIndex(null)
    }, TRANSITION_DURATION)

    return () => window.clearTimeout(timeoutId)
  }, [previousIndex])

  const renderScene = (index, isOutgoing = false) => {
    const isPink = index % 2 === 0
    const poster = posters[index % posters.length]

    return (
      <section
        aria-hidden={isOutgoing}
        aria-label={`Cartaz da atração, modelo ${isPink ? 'rosa' : 'verde'}`}
        className={`stage__scene ${isPink ? 'stage__scene--pink' : 'stage__scene--green'} ${isOutgoing ? 'stage__scene--outgoing' : 'stage__scene--incoming'}`}
        key={index}
      >
        <div className="poster-frame">
          <div className="poster-frame__surface">
            {poster.image && (
              <img
                className="poster-frame__image"
                src={poster.image}
                alt={poster.alt}
              />
            )}
          </div>

          <div className="poster-frame__qrcode">
            {poster.qrCode && (
              <img src={poster.qrCode} alt="QR code" />
            )}
          </div>

          <img className="poster-frame__seal" src={sealImage} alt="" />

          <div className="poster-frame__ticket">
            <span>{poster.text}</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <main className="stage">
      {previousIndex !== null && renderScene(previousIndex, true)}
      {renderScene(displayIndex)}
    </main>
  )
}
