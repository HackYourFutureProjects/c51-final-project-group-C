import { useState } from "react";
import Slider from "react-slider";
const MIN = 1;
const MAX = 50;
const RangeSlider = () => {
  const [values, setValues] = useState([MIN, MAX]);
  console.log(values);
  return (
    <div className="Box w-full max-w-[400px] py-4 pb-6 px-6 bg-background rounded-[10px] shadow-sm h-auto border-border border-solid border-[2px]">
      <h4 className="title text-2xl mb-2 font-small text-accent">
        <span>Duration</span>
      </h4>
      <div className="values m-0 font-medium">
        {values[0]}-{values[1]} Days
      </div>

      <Slider
        className="slider w-full h-[2px] bg-accent mt-4"
        thumbClassName="bg-white w-[18px] h-[18px] rounded-full cursor-grab border-2 border-solid border-accent -top-[7px]"
        value={values}
        min={MIN}
        max={MAX}
        onChange={setValues}
      />
    </div>
  );
};

export default RangeSlider;
