import Slider from "react-slider";

const RangeSlider = ({ value, onChange }) => {
  return (
    <div className="Box w-full max-w-[400px] py-4 pb-6 px-6 bg-background rounded-[10px] shadow-sm h-auto border-border border-solid border-[2px]">
      <h4 className="title text-2xl mb-2 font-small text-accent">
        <span>Duration</span>
      </h4>
      <div className="values m-0 font-medium">
        {value[0]}-{value[1]} Days
      </div>

      <Slider
        className="slider w-full h-[2px] bg-accent mt-4"
        thumbClassName="bg-white w-[18px] h-[18px] rounded-full cursor-grab border-2 border-solid border-accent -top-[7px]"
        value={value}
        min={1}
        max={50}
        onChange={onChange}
      />
    </div>
  );
};

export default RangeSlider;
