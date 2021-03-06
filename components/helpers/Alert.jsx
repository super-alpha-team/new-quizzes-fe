
function Alert({ message, isError = false, hideAlert }) {
    return (
        <div className={"border px-4 py-3 rounded fixed z-[100] top-4 left-1/2 -translate-x-1/2 flex justify-between cursor-pointer" + (isError ? " border-qred-light text-qred bg-qgray-light" : " border-qgreen-light text-qgreen bg-qgray-light")} role="alert">
            <strong className="font-bold mr-1">{isError ? '🙈' : '🎉'}</strong>
            <span className="">{message}</span>
            <span className="ml-3 flex justify-center items-center" onClick={hideAlert}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </span>
        </div>
    );
}

export default Alert;