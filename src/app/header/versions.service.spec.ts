import { createSpyObj } from 'jest-createspyobj';

import { HttpClient } from '@angular/common/http';

import { VersionsService } from './versions.service';

describe('VersionsService', () => {
  let http: jest.Mocked<HttpClient>;
  let service: VersionsService;

  beforeEach(() => {
    http = createSpyObj(HttpClient);
    service = new VersionsService(http as any);
  });

  describe('getCoreVersion', () => {
    it('gets the core version', () => {
      service.getCoreVersion();

      expect(http.get).toHaveBeenCalledWith('/ngapimock/info');
    });
  });
});

