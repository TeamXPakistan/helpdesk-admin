// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'
import { useSettings } from 'src/@core/hooks/useSettings'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'


const SimpleImageSwiper = ({ images }: { images: string[] }) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const {
    settings: { direction }
  } = useSettings()


  // ** Hook
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: direction === 'rtl',
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })


  return (
    <>
      <KeenSliderWrapper>
        <Box className='navigation-wrapper'>
          <Box ref={sliderRef} className='keen-slider'>
            {images?.map((image, index) => {
              return (
                <Box key={index} className='keen-slider__slide' sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={image} alt={index?.toString()} style={{ objectFit: "contain", height: "85vh" }} />
                </Box>
              )
            })}
          </Box>
          {loaded && instanceRef.current && (
            <>
              <Icon
                icon='tabler:chevron-left'
                className={clsx('arrow arrow-left', {
                  'arrow-disabled': currentSlide === 0
                })}
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              />

              <Icon
                icon='tabler:chevron-right'
                className={clsx('arrow arrow-right', {
                  'arrow-disabled': currentSlide === instanceRef.current.track.details.slides.length - 1
                })}
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              />
            </>
          )}
        </Box>
        {loaded && instanceRef.current && (
          <Box className='swiper-dots'>
            {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
              return (
                <Badge
                  key={idx}
                  variant='dot'
                  component='div'
                  className={clsx({
                    active: currentSlide === idx
                  })}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                ></Badge>
              )
            })}
          </Box>
        )}
      </KeenSliderWrapper>
    </>
  )
}

export default SimpleImageSwiper
