import { Directory, Filesystem } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { useEffect } from "react";

export const useFs = () => {
  useEffect(() => {
    const init = async () => {
      const isPermitted = await Filesystem.checkPermissions();
      if (isPermitted.publicStorage !== "granted") {
        await Filesystem.requestPermissions();
      }
    };

    init();
  }, []);

  const handleDownload = async (url: string, path: string) => {
    await Filesystem.downloadFile({
      url: url,
      path: `scholar-sync/${path}`,
      directory: Directory.Data,
    });
  };

  const openFile = async (path: string) => {
    const filePath = await Filesystem.getUri({
      directory: Directory.Data,
      path: `scholar-sync/${path}`,
    });

    await FileOpener.open({
      filePath: filePath.uri,
    });
  };

  return {
    handleDownload,
    openFile,
  };
};
