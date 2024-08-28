import React from "react";

// Accept any SVG icon as children.
// By default, the icon is styled with your primary color.
const BetterIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-3 inline-flex items-center justify-center rounded-full bg-primary/20 text-primary">
      {children}
    </div>
  );
};

export default BetterIcon;
