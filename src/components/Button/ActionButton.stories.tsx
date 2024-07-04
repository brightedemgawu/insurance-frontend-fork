import {Meta, StoryObj} from "@storybook/react";
import ActionButton from "@/components/Button/ActionButton";

const meta: Meta<typeof ActionButton> = {
    title: "Components/Buttons/ActionButton",
    component: ActionButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;


type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Button",
        onClick: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
}

export const Destructive: Story = {
    args: {
        children: <p>Button</p>,
        variant: "destructive",
        onClick: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
}

export const Light: Story = {
    args: {
        children: <p>Button</p>,
        variant: "light",
        onClick: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
}


export const Alternative: Story = {
    args: {
        children: <p>Button</p>,
        variant: "alternative",
        onClick: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
}
