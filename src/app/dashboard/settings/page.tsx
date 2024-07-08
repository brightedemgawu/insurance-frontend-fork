import {redirect} from 'next/navigation'
import {SettingsLayoutLinks} from "@/constants/links/dashboard-links";
import {Skeleton} from "@/components/ui/skeleton";

export default function Page() {

    if (SettingsLayoutLinks && SettingsLayoutLinks.length > 0) {
        redirect(SettingsLayoutLinks[0].link)
    }

    return (<Skeleton className={"w-full h-[55vh]"} />)
}
