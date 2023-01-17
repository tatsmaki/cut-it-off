import { renderer } from "../renderer";
import { AudioController } from "./audio.controller";

export class XrController {
  private session: XRSession | null = null;

  constructor(private readonly audioController: AudioController) {
    this.onSessionEnd = this.onSessionEnd.bind(this);
  }

  async startSession(mode: XRSessionMode = "immersive-vr") {
    if (navigator.xr) {
      const options = {
        optionalFeatures: ["local", "local-floor", "viewer"],
      };
      this.session = await navigator.xr.requestSession(mode, options);
      this.session.onend = this.onSessionEnd;
      await renderer.xr.setSession(this.session);
    }
  }

  onSessionEnd() {
    this.session = null;
    this.audioController.stop();
    renderer.dispose();
  }

  async handleExit() {
    if (this.session) {
      await this.session.end();
    }
  }
}
