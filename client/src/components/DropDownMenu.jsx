import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

function DropDownMenu({ name, items, onClick }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    if (item === "Clear") {
      setSelected(null);
      onClick(null);
    } else {
      setSelected(item);
      onClick(item);
    }
    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex 
          items-center 
          gap-3 
          px-6 
          py-3 
          rounded-lg
          border 
          border-border
          bg-background
          text-accent
          hover:border-accent
          transition 
          duration-300
          focus:outline-none
          focus:ring-2
          focus:ring-accent
          focus:border-accent
          select-none
          text-lg
          font-medium
          h-auto
          mt-5
        "
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span>
          {name}
          {selected && (
            <span className="font-normal  text-border text-lg ">
              : {selected}
            </span>
          )}
        </span>
        <HiChevronDown className="w-7 h-6 text-accent" />
      </button>

      {open && (
        <div
          className="
            absolute 
            z-10 
            w-full 
            origin-top-right 
            rounded-lg 
            bg-background 
            border 
            border-border
            shadow-lg 
            ring-1 
            ring-black 
            ring-opacity-5
            
          "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <ul className="py-2 text-base">
            {items.map((item, index) => (
              <li key={index} role="none">
                <button
                  onClick={() => handleSelect(item)}
                  className="
                    block 
                    w-full 
                    px-6 
                    py-3 
                    text-text 
                    text-left 
                    rounded-lg 
                    hover:bg-accent 
                    hover:text-background 
                    transition-colors 
                    duration-200
                    focus:outline-none
                    focus:bg-accent
                    focus:text-background
                  "
                  role="menuitem"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDownMenu;
