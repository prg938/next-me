import React, {useEffect, FunctionComponent} from "react"
import styles from '@/styles/CityGallery.module.scss'
import Image from 'next/image'
import pic1 from '@/../public/mycity/1.jpg'
import pic2 from '@/../public/mycity/2.jpg'

enum ArrowType {L, R}

const CityGallery: FunctionComponent = () => {
  const [currentImageIndex, setImageIndex] = React.useState<number>(0)
  const sityImages = [[pic1, ''], [pic2, '']]
  const currentImage = sityImages[currentImageIndex]
  let timeoutId: Parameters<typeof clearTimeout>[0] = undefined

  const arrowClick = (type: ArrowType) => {
    let imageIndex = currentImageIndex
    if (type === ArrowType.L) {
      imageIndex = imageIndex - 1
    }
    else if (type === ArrowType.R) {
      imageIndex = imageIndex + 1
    }
    if (imageIndex < 0) imageIndex = sityImages.length - 1
    if (imageIndex === sityImages.length) imageIndex = 0
    setImageIndex(imageIndex)
  }

  const dashes = sityImages.map((image, i) => <div key={i} className={i <= currentImageIndex ? styles.dash : styles.dash + ' ' + styles.opaq}></div>)
  
  let title = currentImage[1] as string
  if (title.length === 0) title = ''
  
  useEffect(() => {
    timeoutId = setTimeout(() => {
      if (currentImageIndex === sityImages.length - 1) setImageIndex(0)
      else setImageIndex(currentImageIndex + 1)
    }, 10000)
    return () => {
      clearTimeout(timeoutId)
    }
  })
  return <div className={styles.gallery}>
    <Image src={currentImage[0]} placeholder="blur" alt="obninsk" />
    <div className={styles.imageListBarTitleGroup}>
      <div className={styles.imageListBar}>{dashes}</div>
      <div className={styles.title}>{title}</div>
    </div>
    <div className={styles.arrowWrapper}>
      <div className={styles.arrow} onClick={() => arrowClick(ArrowType.L)}>
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path></svg>
      </div>
      <div className={styles.arrow} onClick={() => arrowClick(ArrowType.R)}>
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg>
      </div>
    </div>
  </div>
}

export default CityGallery