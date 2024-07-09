import {toast} from 'react-hot-toast'


export const errorToast =(message)=>{
    toast.error(message,{
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
}

export const successToast = (message)=>{
  toast.success(message,{
    style: {
      border: '1px solid #228B22',
      padding: '16px',
      color: '#228B22',
    },
    iconTheme: {
      primary: '#228B22',
      secondary: '#FFFAEE',
    },
  });
}