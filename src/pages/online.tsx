import { useStates } from "src/state/state";
import { DownloadCustomContent, hasPakInstalled } from "src/lib/import";
import { useLibraryControl } from "src/state/library";
import { useConfigControl } from "src/state/config";

import PlaySnow from "src/components/play";
import Book from "src/components/book";
import DownloaderArea from "src/components/downloader";
import Player from "src/components/player";
import ShopPreview from "src/components/smallShop";
import FreeVbucks from "src/components/freeVbucks";

const Online = () => {
  const [is_downloading] = useStates((s) => [s.is_downloading]);
  const libraryControl = useLibraryControl();
  const config = useConfigControl();

  return (
    <>
      <div className="snowOverview">
        <Player />
        <DownloaderArea />
        <div className="duo">
          <div className="colmax">
            <Book />
            <FreeVbucks />
          </div>
          <ShopPreview />
        </div>
      </div>

      {!config.drawer_open &&
        (!hasPakInstalled ||
          (!libraryControl.pakValid &&
            libraryControl.getCurrentEntry() != null && (
              <button
                className="default custom"
                onClick={DownloadCustomContent}
                disabled={is_downloading}
              >
                Update Pak Files
              </button>
            )))}

      <PlaySnow />
    </>
  );
};

export default Online;
