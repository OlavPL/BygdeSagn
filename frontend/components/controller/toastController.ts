import { ToastOptions } from "react-toastify"

export enum ToastType{
    light,
    dark,
    colored
}

export const getToastOptions = (type:ToastType) =>{
    switch (type) {
        case ToastType.colored:
            return {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            } as ToastOptions<{}> 
            break;
        
        case ToastType.light :
            return {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            } as ToastOptions<{}> 
            break;

        case ToastType.dark :
            return {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
            } as ToastOptions<{}> 
            break;
    
        default:
            return {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            } as ToastOptions<{}> 
            break;
    }
}