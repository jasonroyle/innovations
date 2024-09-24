import type { Meta, StoryObj } from '@storybook/angular';
import { MasterDetailComponent } from './master-detail.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<MasterDetailComponent> = {
  component: MasterDetailComponent,
  title: 'MasterDetailComponent',
};
export default meta;
type Story = StoryObj<MasterDetailComponent>;

export const Primary: Story = {
  args: {
    masterSpacing: true,
    detailSpacing: true,
  }
};

export const Heading: Story = {
  args: {
    masterSpacing: true,
    detailSpacing: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/master-detail works!/gi)).toBeTruthy();
  },
};
