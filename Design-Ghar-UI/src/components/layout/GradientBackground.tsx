// Reusable gradient background component
export const GradientBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-[50vh] z-0 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, #c7eafb, #ffffff)',
      }}
    />
  );
};

