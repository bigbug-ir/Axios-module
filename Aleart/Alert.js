import swal from "sweetalert"

export const Confirm =  (_title,message,_icon,_buttons,_dangerMode) =>{

    return swal({
        title: _title,
        text:message,
        icon: _icon,
        buttons:_buttons,
        dangerMode: _dangerMode,
    })
}
export const Alert = (message ,_icon,_buttons) =>{
    return swal(message,{
        icon:_icon,
        buttons:_buttons
    })
}
export const Success = ()=>{
    return swal("عملیات افزودن با موفقیت انجام شد", {
        icon: "success",
      });
}
export const Error = ()=>{
    return swal("عملیات با خطا مواجه شد",{
        icon: "error"
        })
}