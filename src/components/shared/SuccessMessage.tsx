import React from 'react';

type Props = {
  message: string;
};

function SuccessMessage({ message }: Props) {
  if (!message) return null;
  return (
    <div className="p-2 text-center rounded-lg bg-emerald-500/30 text-emerald-500">
      {message}
    </div>
  );
}

export default SuccessMessage;
