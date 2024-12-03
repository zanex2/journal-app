import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.journalX.app',
  appName: 'JournalX - Make your day better',
  webDir: 'out'
  server:{
    androidScheme:"https"
  }
};

export default config;
