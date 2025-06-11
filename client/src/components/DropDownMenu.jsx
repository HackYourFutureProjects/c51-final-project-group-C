import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

function DropDownMenu({ name, items, onClick }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null); // <-- track selected option
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
          gap-2 
          px-4 
          py-2 
          h-9
          rounded-full 
          border 
          border-border
          bg-background
          hover:bg-accent/10 
          transition 
          duration-300
          focus:outline-none
          focus:border-accent
          focus:ring-accent
        "
      >
        <span className="text-base font-medium">
          {name}
          {selected && (
            <span className="ml-2 font-normal text-sm text-gray-500">
              : {selected}
            </span>
          )}
        </span>
        <HiChevronDown className="w-5 h-5 text-accent" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(item)}
                  className="block w-full px-4 py-2 text-left text-accent rounded hover:bg-accent hover:text-white transition-colors duration-200"
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
