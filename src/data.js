export const API_KEY = "AIzaSyB--TapIZx3VKbJER0e1VAI4Hyf3OHHKsk";

export const value_convert = (value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M";
    }else if(value>=1000){
        return Math.floor(value/1000)+"k"
    }else{
        return value;
    }
}