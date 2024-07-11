import CreateUpdateAccessLevel from "@/app/dashboard/settings/access-level/_components/CreateUpdateAccessLevel";

export default function Page({params}: { params: { id: string } }) {
    return <CreateUpdateAccessLevel id={params.id} />
}
