interface DividerProps {
  label?: string;
}

export const Divider = ({ label }: DividerProps) => {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      {label && (
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            {label}
          </span>
        </div>
      )}
    </div>
  );
};
