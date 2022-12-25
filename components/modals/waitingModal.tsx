import { NextPage } from 'next';

const WaitingModal:NextPage<{header:string, message: string}> = ({
  header,
  message,
}) => {
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {header}
          </h3>
          <p className="py-4">
            {message}
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingModal;
