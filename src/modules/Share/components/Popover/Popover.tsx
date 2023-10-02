import { useRef, useId, ElementType } from 'react'
import { useFloating, FloatingPortal, arrow, shift, offset, type Placement } from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  placement?: Placement
  isOpenPopover: boolean
  setIsOpenPopover: React.Dispatch<React.SetStateAction<boolean>>
}

const Popover = ({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  placement,
  isOpenPopover,
  setIsOpenPopover
}: Props) => {
  const id = useId()

  const arrowRef = useRef<HTMLElement>(null)

  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })

  const togglePopover = () => {
    setIsOpenPopover(!isOpenPopover)
  }

  return (
    <Element className={className} ref={reference}>
      <Element onClick={togglePopover}>{children}</Element>
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpenPopover && (
            <motion.div
              className='relative z-50'
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.1 }}
            >
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Popover
