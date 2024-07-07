import {redirect} from 'next/navigation'
import {SettingsLayoutLinks} from "@/constants/links/dashboard-links";

export default function Page() {

    if (SettingsLayoutLinks && SettingsLayoutLinks.length > 0) {
        redirect(SettingsLayoutLinks[0].link)
    }

    return <h1>Settings Page</h1>
}
