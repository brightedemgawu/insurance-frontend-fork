import AccessLevelTable from "@/app/dashboard/settings/access-level/_components/Table/AccessLevelTable";

export default async function Page() {

    return (
        <main
            className="w-full rounded-md  p-4  bg-gray-white"
        >
            <AccessLevelTable/>
        </main>
    )
}
