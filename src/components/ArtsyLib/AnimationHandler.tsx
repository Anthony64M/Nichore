import { AnimatePresence, motion } from "framer-motion";

const variantsX = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 9000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export type PaginationState = number[];
export interface IAnimationHandlerProps {
  paginate: (direction: number) => void;
  currentPage: PaginationState;
}

export const AnimationHandler: React.FC<IAnimationHandlerProps> = ({
  children,
  currentPage,
  paginate,
}) => {
  const [page, direction] = currentPage;
  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={page}
        custom={direction}
        variants={variantsX}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
          }
        }}
        className="carousel-item-container"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
