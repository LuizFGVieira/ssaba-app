import React from "react";

interface AvisoModalProps {
  visible: boolean;
  setVisible: (open: boolean) => boolean | void;
  mensagem: string;
}

const ErrorModal: React.FC<AvisoModalProps> = ({
  visible,
  setVisible,
  mensagem,
}) => {
  const handleVoltarClick = () => {
    setVisible(false);
    return false;
  };

  return (
    visible && (
      <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm">
          <div className="flex justify-end p-2">
            <button
              onClick={handleVoltarClick}
              type="button"
              className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="p-6 pt-0 text-center">
            <svg
              className="w-20 h-20 text-red-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
              {mensagem}
            </h3>
          </div>
        </div>
      </div>
    )
  );
};

export default ErrorModal;
