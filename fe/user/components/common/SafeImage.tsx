// fe/components/common/SafeImage.tsx
'use client'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type Props = ImageProps & { fallbackSrc: string }

export default function SafeImage({ src, fallbackSrc, ...rest }: Props) {
  const [err, setErr] = useState(false)
  return (
    <Image
      {...rest}
      src={err ? fallbackSrc : src}
      onError={() => setErr(true)}
    />
  )
}
