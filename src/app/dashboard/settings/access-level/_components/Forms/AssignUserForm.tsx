import {CreateAccessLevelDto} from "@/services/access-levels/dtos/request/CreateAccessLevelDto";
import {useEffect, useState} from "react";
import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";
import useUsersService from "@/services/users/useUsersService";
import {handleApiErrors} from "@/lib/handleApiErrors";
import ActionButton from "@/components/Button/ActionButton";
import {Separator} from "@/components/ui/separator";
import AccessLevelAssignedUsersTable
    from "@/app/dashboard/settings/access-level/_components/Table/AccessLevelAssignedUsersTable";
import AssignUsersToAccessLevelFormDialog
    from "@/app/dashboard/settings/access-level/_components/Forms/AssignUsersToAccessLevelFormDialog";

interface AssignUserFormProps {
    id?: string,
    dto: CreateAccessLevelDto,
    onPreviousTab: (value: CreateAccessLevelDto) => void,
    onSubmit: (value: CreateAccessLevelDto) => Promise<void>
}

const AssignUserForm = ({dto, onPreviousTab, onSubmit, id}: AssignUserFormProps) => {

    const [employees, setEmployees] = useState<EmployeeReadDto[]>([])

    const [tableData, setTableData] = useState<EmployeeReadDto[]>([])

    const {getEmployees} = useUsersService()

    const removeEmployee = (value: EmployeeReadDto) => {
        setTableData(prevState => {
            return prevState.filter(item => item.email !== value.email)
        })
    }

    const fetchEmployees = async () => {
        await getEmployees()
            .then((data) => {
                setEmployees(data.data!)
            })
            .catch(errors => {
                handleApiErrors(errors)
            })
    }

    useEffect(() => {
        if (dto && dto.assignedUsers && dto.assignedUsers?.length > 0) {
            const data = employees.filter(item => dto.assignedUsers!.includes(item.email))
            setTableData(data)
        }

    }, [dto, employees]);

    useEffect(() => {
        fetchEmployees().then()
    }, [])

    return (
        <div
            className={"w-full "}
        >
            <div
                className={"w-full flex justify-between items-center"}
            >
                <h4
                    className={"text-gray-text text-[1rem] font-medium"}
                >
                    Assigned Users
                    {" "}
                    <span
                        className={"text-gray-700"}
                    >
                        ({tableData.length})
                    </span>
                </h4>
                <AssignUsersToAccessLevelFormDialog
                    onAddEmployee={(value) => {
                        setTableData(prevState => [...prevState, value])
                    }}
                    onRemoveEmployee={removeEmployee}
                    assignedEmployees={tableData}
                    allEmployees={employees}
                />
            </div>

            <Separator className={"my-2"}/>
            <AccessLevelAssignedUsersTable
                onRemoveEmployee={removeEmployee}
                tableData={tableData}/>
            <div
                className={"w-full mt-4 flex gap-4"}
            >
                <ActionButton
                    onClick={() => {
                        dto.assignedUsers = tableData.map(em => em.email);
                        onPreviousTab(dto)
                    }}
                    className={"py-2"}
                    type={"button"}>
                    PREVIOUS
                </ActionButton>
                <ActionButton
                    onClick={async () => {
                        dto.assignedUsers = tableData.map(em => em.email);
                        await onSubmit(dto)
                    }}
                    className={"py-2"}
                    type={"button"}>
                    {id ? "UPDATE" : "SUBMIT"}
                </ActionButton>
            </div>
        </div>
    )
}

export default AssignUserForm;
