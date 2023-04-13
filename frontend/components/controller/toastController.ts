import { ToastOptions } from "react-toastify"

export enum ToastType{
    light,
    dark,
    colored
}

export const getToastOptions = (type:ToastType, id?: string) =>{
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
                toastId:id
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
                toastId:id
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
                toastId:id
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
                toastId:id
            } as ToastOptions<{}> 
            break;
    }
}