import { HostConfigType, InulaReconcilerType } from './Types';

export const InulaReconciler: InulaReconcilerType = {
  hostConfig: {} as HostConfigType,
  setHostConfig(config: HostConfigType) {
    this.hostConfig = { ...this.hostConfig, ...config };
  },
};
