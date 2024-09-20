import { HTMLProps } from "react";

export function Textarea({...rest}: HTMLProps<HTMLTextAreaElement>){
    return <textarea {...rest} className="border w-full h-40 text-sm rounded-md resize-none outline-none p-2 whitespace-pre-wrap"></textarea>
}