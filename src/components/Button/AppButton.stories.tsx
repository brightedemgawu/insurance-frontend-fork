import AppButton from "@/components/Button/AppButton";
import {Meta, StoryObj} from "@storybook/react";


const meta: Meta<typeof AppButton> = {
    title: "Components/Buttons/AppButton",
    component: AppButton,
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
    }
}

export const Destructive: Story = {
    args: {
        children: <p>Button</p>,
        variant: "destructive"
    }
}

export const Light: Story = {
    args: {
        children: <p>Button</p>,
        variant: "light"
    }
}

export const Link: Story = {
    args: {
        children: <p>Button</p>,
        variant: "link"
    }
}

export const Alternative: Story = {
    args: {
        children: <p>Button</p>,
        variant: "alternative"
    }
}
