import { Mock } from '@ng-apimock/core/dist/mock/mock';
export interface MockState {
  delay: number;
  echo: boolean;
  scenario: string;
}

// todo this could be done in core and exported to enforce strict typing
export interface GetMocksResponse {
  state: MocksWithState;
  mocks: Mock[];
}

export type MocksWithState = Record<string, MockState>;
