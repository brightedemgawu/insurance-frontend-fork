import {Meta, StoryObj} from "@storybook/react";
import AppTextInput from "@/components/Form/Inputs/AppTextInput/AppTextInput";
import {Shapes} from "lucide-react";

const meta: Meta<typeof AppTextInput> = {
    title: "Components/Forms/Inputs/AppTextInput",
    component: AppTextInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],

};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "email",
        placeholder: "Enter your email"
    }
}

export const Required: Story = {
    args: {
        name: "email",
        placeholder: "Enter your email",
        label: "Email",
        required: true
    }
}

export const WithIcon: Story = {
    args: {
        name: "email",
        placeholder: "Enter your email",
        label: "Email",
        required: true,
        Icon: Shapes
    }
}


export const Invalid: Story = {
    args: {
        name: "email",
        placeholder: "Enter your email",
        label: "Email",
        required: true,
        Icon: Shapes,
        invalid: true,
        error: "Enter a valid email"
    }
}
