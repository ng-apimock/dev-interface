export interface InfoResponse {
  build: Build;
}

export interface Build {
  artifact: string;
  description: string;
  version: string;
}