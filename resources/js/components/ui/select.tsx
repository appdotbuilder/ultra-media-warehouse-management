import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, value, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (onValueChange) {
        onValueChange(event.target.value);
      }
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <select
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        value={value}
        onChange={handleChange}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => (
  <div className="flex h-10 w-full items-center justify-between">
    {children}
  </div>
);

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => (
  <div className="relative">
    {children}
  </div>
);

export const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, children, ...props }, ref) => (
    <option
      ref={ref}
      className={cn('relative flex cursor-default select-none items-center py-1.5 px-2', className)}
      {...props}
    >
      {children}
    </option>
  )
);
SelectItem.displayName = 'SelectItem';

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => (
  <span className="block truncate">{placeholder}</span>
);