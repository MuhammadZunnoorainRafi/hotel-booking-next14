import React from 'react';

type Props = {
  message: string;
};

function ErrorMessage({ message }: Props) {
  if (!message) return null;
  return (
    <div className="p-3 mt-2 text-center rounded-lg bg-destructive/30 text-destructive">
      {message}
    </div>
  );
}

export default ErrorMessage;
