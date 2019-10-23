import Tone from "tone";
import * as mic from "./mic.js";

const analy = new Tone.Analyzer({
  size: 1024,
  type: fft
});

