import { HTMLProps } from "react";

export function Textarea({...rest}: HTMLProps<HTMLTextAreaElement>){
    return <textarea {...rest} className="border border-gray-400 w-full h-44 text-sm rounded-md resize-none outline-none p-2 whitespace-pre-wrap"></textarea>
}