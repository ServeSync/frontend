interface Props {
  rating: number
  activeClassname?: string
  nonActiveClassname?: string
}
const EventRating = ({
  rating,
  activeClassname = 'w-4 h-4 fill-[#FF5722] text-[#FF5722]',
  nonActiveClassname = 'w-4 h-4 fill-current text-gray-300'
}: Props) => {
  const handleWidth = (rating: number) => {
    if (rating > 0) {
      return rating * 20 + '%'
    }
    return '0%'
  }
  return (
    <div className='flex items-center text-[#FF5722] justify-center gap-1 text-[14px]'>
      {rating}
      <div className='relative'>
        <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: handleWidth(rating) }}>
          <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={activeClassname}>
            <polygon
              points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </svg>
        </div>
        <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={nonActiveClassname}>
          <polygon
            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit={10}
          />
        </svg>
      </div>
    </div>
  )
}

export default EventRating
