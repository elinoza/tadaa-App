import React from "react";

const Input = React.forwardRef(function Input({ ...props }, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className="outline-none p-2 bg-[#FFFCF5] rounded focus:bg-white shadow w-full "
    />
  );
});
export default Input;
