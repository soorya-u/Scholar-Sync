import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.soorya_u.scholar_sync",
  appName: "Scholar Sync",
  webDir: "out",
  backgroundColor: "#fff",
  ios: {
    allowsLinkPreview: true,
    backgroundColor: "#fff",
    scrollEnabled: true,
    path: "./mobile/ios",
  },
  android: {
    backgroundColor: "#fff",
    path: "./mobile/android",
  },
};

export default config;
