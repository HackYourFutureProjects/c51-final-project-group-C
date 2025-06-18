import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Content = ({ isOpen, children }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && isOpen) {
      setContentHeight(contentRef.current.scrollHeight);

      if (!resizeObserverRef.current) {
        resizeObserverRef.current = new ResizeObserver(() => {
          if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
          }
        });
      }

      resizeObserverRef.current.observe(contentRef.current);

      return () => {
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
      };
    }
  }, [isOpen, children]);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: contentHeight,
            opacity: 1,
            transition: {
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, delay: 0.1 },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2 },
            },
          }}
          className="accordion-content overflow-hidden"
        >
          <div
            ref={contentRef}
            className="content-inner p-4 sm:p-6 border-t border-border"
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Content;
