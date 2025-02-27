import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import { uglify } from "rollup-plugin-uglify";

const targetConfig = {
  snippet: {
    input: "./src/snippet/index.ts",
    file: "./build/assets/snippet.js",
    format: "iife",
    plugins: [
      typescript(),
      replace({
        values: {
          "process.env.TRACKER_SCRIPT_URL": JSON.stringify(
            process.env.TRACKER_SCRIPT_URL,
          ),
        },
      }),
      uglify(),
    ],
  },
  tracker: {
    input: "./src/tracker/index.ts",
    file: "./build/assets/tracker.js",
    format: "iife",
    plugins: [
      typescript(),
      replace({
        values: {
          "process.env.TRACK_ENDPOINT_URL": JSON.stringify(
            process.env.TRACK_ENDPOINT_URL,
          ),
        },
      }),
      uglify(),
    ],
  },
  server: {
    input: "./src/server/index.ts",
    file: "./build/index.js",
    format: "es",
    plugins: [typescript()],
  },
};

if (!(process.env.ROLLUP_TARGET in targetConfig)) {
  throw new Error(
    `Environment variable ROLLUP_TARGET must be one of: ${Object.keys(targetConfig)}, current value: ${process.env.ROLLUP_TARGET}`,
  );
}

const target = targetConfig[process.env.ROLLUP_TARGET];

const config = {
  input: target.input,
  output: {
    file: target.file,
    banner: target.banner,
    footer: target.footer,
    format: target.format,
  },
  plugins: target.plugins,
};

export default config;
