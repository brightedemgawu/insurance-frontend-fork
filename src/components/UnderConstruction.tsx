import Image from "next/image";
import {underConstruction} from "../../public";

export default function UnderConstruction() {
    return (
        <div
            className={"w-full h-[92vh] bg-gray-white flex items-center flex-col gap-8 justify-center "}
        >

            <Image
                src={underConstruction}
                alt={"under construction"}
                className={"size-[50%]"}
            />
            <p
                className={"text-2xl text-gray-black font-medium tracking-wider"}
            >
                Under Construction 🚧
            </p>
        </div>
    )
}
