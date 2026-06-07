import { ImageResponse } from 'next/og'
import { promises as fs } from 'fs'
import path from 'path'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default async function Icon() {
  const imagePath = path.join(process.cwd(), 'public', 'logo-imm.png')
  const imageBuffer = await fs.readFile(imagePath)
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'black',
        }}
      >
        <img
          src={base64Image}
          style={{ width: '130%', height: '130%', objectFit: 'cover' }}
        />
      </div>
    ),
    { ...size }
  )
}
