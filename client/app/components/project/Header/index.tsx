type Props = {
    name : string;
    buttonComponenents?:any;
    isSmallText?: boolean;
}

export default function Header(
    {name,buttonComponenents,isSmallText=false}:Props
) {
    return (
        <div className="mb-5 flex w-full items-center justify-between">
            <h1 className={`${isSmallText ? "text-lg" : "text-sm"} font-semibold`}>{name}</h1>
            {buttonComponenents}
        </div>
    )
}