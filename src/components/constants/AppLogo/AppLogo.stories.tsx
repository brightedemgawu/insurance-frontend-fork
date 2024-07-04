import AppLogo from "@/components/constants/AppLogo/AppLogo";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof AppLogo> = {
    title: "Components/Constants/AppLogo",
    component: AppLogo,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const IconOnly: Story = {
    args: {
        iconOnly: true
    },
};
