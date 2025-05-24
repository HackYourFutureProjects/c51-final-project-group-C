import { useEffect, useRef, useState } from "react";

function DropDownMenu({ name, items, onClick }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // this is to Close dropdown on outside click
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

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className=" drop-down w-[240px] text-text p-2 rounded-xl border  transform transition-all hover:-translate-y-1 duration-300 "
      >
        {name}
      </button>

      {open && (
        <div className="drop-down-menu absolute z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="drop-down-items py-1 text-sm text-gray-700">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    onClick(item);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
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
