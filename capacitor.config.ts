import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.wisevill.wavver',
  appName: 'lopi',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
  },
  server: {
    androidScheme: 'http'
  }
};
export default config;