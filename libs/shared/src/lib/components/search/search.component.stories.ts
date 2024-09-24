import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { SearchComponent } from './search.component';

const meta: Meta<SearchComponent> = {
  component: SearchComponent,
  title: 'SearchComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(RouterModule.forRoot([]))],
    }),
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<SearchComponent>;

export const Primary: Story = {
  args: {
    caseSensitive: false,
    data: [],
    debounceTime: 300,
    placeholder: 'Search…',
    routerEnabled: false,
    term: '',
  },
};

export const Heading: Story = {
  args: {
    caseSensitive: false,
    data: [],
    debounceTime: 300,
    placeholder: 'Search…',
    routerEnabled: false,
    term: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/search works!/gi)).toBeTruthy();
  },
};
