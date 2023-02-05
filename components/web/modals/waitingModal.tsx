import { NextPage } from 'next';
import React from 'react';

const WaitingModal: NextPage<{ header: string; message: string }> = ({ header, message }) => {
  return (
    <div>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>{header}</h3>
        <p className='py-4'>{message}</p>
      </div>
    </div>
  );
};

export default WaitingModal;
