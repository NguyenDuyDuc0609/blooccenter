import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && <GlobalLoading />}
    </LoadingContext.Provider>
  );
}

function GlobalLoading() {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  };

  const spinnerStyle = {
    width: "48px",
    height: "48px",
    border: "4px solid white",
    borderTop: "4px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      <div style={overlayStyle}>
        <div style={spinnerStyle}></div>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}


export function useLoading() {
  return useContext(LoadingContext);
}
