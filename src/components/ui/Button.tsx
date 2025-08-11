import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  label2?: string;
}

export const Button: React.FC<ButtonProps> = ({ label, label2, ...rest }) => {
  return (
    <div>
      <button className="btn bg-yellow-400 rounded-full px-6 py-2 text-white" {...rest}>
        {label} {label2 && ` - ${label2}`}
      </button>
    </div>
  );
};

export const Button2: React.FC<ButtonProps> = ({ label, label2, ...rest }) => {
  return (
    <div>
      <button className="btn bg-red-400 rounded-full px-6 py-2 text-white" {...rest}>
        {label} {label2 && ` - ${label2}`}
      </button>
    </div>
  );
};
