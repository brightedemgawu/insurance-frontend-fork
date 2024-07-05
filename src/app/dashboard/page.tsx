import {signOut} from "@/auth";

export default function Page() {
    return (
        <div
            className={"w-full h-[200vh]"}
        >
            <h1>Dashboard Page</h1>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </div>
    )
}
