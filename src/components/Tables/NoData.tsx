import Image from "next/image";
import {noDataIllustration} from "../../../public";

export default function NoData() {
    return (
        <div
            className={"w-full h-[30vh] flex flex-col items-center justify-center"}
        >
            <Image
                src={noDataIllustration}
                alt={"no data illustration"}
            />
            <p>
                No results.
            </p>
        </div>
    )
}
