import { useState } from "react";
import Slider from "react-slider";
const MIN = 1;
const MAX = 50;
const RangeSlider = () => {
  const [values, setValues] = useState([MIN, MAX]);
  console.log(values);
  return (
    <div className=" range-slider-container">
      <div className="Box w-full max-w-[320px] py-[36px] px-[32px] bg-white rounded-[10px] shadow-sm h-auto">
        <h3 className="title text-3xl mb-5 font-medium text-accent	">
          <span>Duration</span>
        </h3>
        <div className="values m-0 font-medium">
          {values[0]}-{values[1]} Days
        </div>

        <Slider
          className="slider w-full h-[2px] bg-accent mt-[20px] "
          thumbClassName="bg-white w-[23px] h-[23px] rounded-full cursor-grab border-2 border-solid border-accent -top-[10px]"
          value={values}
          min={MIN}
          max={MAX}
          onChange={setValues}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
