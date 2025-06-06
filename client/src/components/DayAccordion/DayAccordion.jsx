import { useState } from "react";
import DayAccordionTitle from "./DayAccordionTitle";
import DayAccordionContent from "./DayAccordionContent";

const DayAccordion = ({ title, children, defaultOpen = false, dayNumber }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion-container border border-border rounded-2xl mb-4 overflow-hidden transition-all duration-200">
      <DayAccordionTitle
        title={title}
        dayNumber={dayNumber}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      <DayAccordionContent isOpen={isOpen}>{children}</DayAccordionContent>
    </div>
  );
};

export default DayAccordion;
