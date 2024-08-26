type ButtonsProps = {
    title: string,
    classname?: string,
    handleClick?: () => void
}
function Buttons({ title, classname, handleClick }: ButtonsProps) {
    return (
        <button className={`w-[10vw] p-3 rounded-lg text-xl text-white ${classname}`}
                onClick={handleClick}>
            {title}
        </button>
    )
}

export default Buttons