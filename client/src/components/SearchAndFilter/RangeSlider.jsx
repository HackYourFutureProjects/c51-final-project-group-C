import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const RangeSlider = ({ value, onChange }) => {
  return (
    <div className="range-slider-container ">
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,

          bgcolor: "var( --color-background)",
          borderRadius: 2,
          border: "2px solid",
          borderColor: "var(--color-border)",
        }}
      >
        <Typography variant="h6" color="var(--color-accent)" gutterBottom>
          Duration
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value[0]} - {value[1]} Days
        </Typography>

        <Slider
          value={value}
          onChange={(e, newValue) => onChange(newValue)}
          valueLabelDisplay="auto"
          min={1}
          max={50}
          sx={{
            mt: 1,
            mb: -1,
            height: 2,
            color: "var(--color-accent)",
            "& .MuiSlider-thumb": {
              backgroundColor: "#fff",
              border: "2px solid var(--color-accent)",
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none", // remove shadow/glow on hover/focus/active
                // optionally override color or other styles here if needed
              },
            },
            "& .MuiSlider-valueLabel": {
              display: "none",
              "&:before": {
                display: "none",
              },
            },
          }}
        />
      </Box>
    </div>
  );
};

export default RangeSlider;
