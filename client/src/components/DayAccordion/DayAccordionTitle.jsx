import { motion } from "framer-motion";
import { LuChevronDown as AccordionArrowIcon } from "react-icons/lu";

const DayAccordionTitle = ({ title, dayNumber, isOpen, onClick }) => {
  return (
    <button
      className="accordion-header w-full flex justify-between items-center p-4 sm:p-4 cursor-pointer duration-200 text-left"
      onClick={onClick}
    >
      <div className="accordion flex items-center sm:flex-col w-max sm:items-start gap-4">
        <div className="accordion-title-container flex items-center gap-4 sm:gap-4 flex-shrink-0">
          {dayNumber && (
            <span className="day-number border border-border px-2 py-1 rounded-md mt-1 w-max flex-shrink-0 font-semibold text-accent">
              Day {dayNumber}
            </span>
          )}
          <h3 className="accordion-title-text font-semibold text-xl sm:text-3xl">
            {title}
          </h3>
        </div>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="accordion-toggle-btn w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0"
      >
        <AccordionArrowIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
      </motion.div>
    </button>
  );
};

export default DayAccordionTitle;
