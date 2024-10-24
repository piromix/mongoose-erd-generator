import { Command } from 'commander';
import { generateFromModels } from '../lib/ERD';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const program = new Command();

program
  .version('0.0.5')
  .option('-p, --path <path>', 'set models path wanted to generate an ERD from.')
  .option('-o, --output <path>', 'set output path')
  .option('-i, --ignore-index', 'ignore any files called index.js')
  .option('-f, --format [svg,dot,xdot,plain,plan-ext,ps,ps2,json,json0]', 'set output format', 'svg')
  .option('-c, --color <color>', 'set color');

program.parse(process.argv);

const options = program.opts();

const modelsPath = options.path;
const outputPath = options.output;
const ignoreIndex = options.ignoreIndex;
const format = options.format;
const color = options.color;

const models: mongoose.Model<any>[] = [];

const loadModels = (dir: string): void => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      loadModels(fullPath);
    } else if (file.endsWith('.js') && (!ignoreIndex || file !== 'index.js')) {
      const model = require(fullPath);
      if (model instanceof mongoose.Model) {
        models.push(model);
      }
    }
  });
};

loadModels(modelsPath);

generateFromModels(models, { format, collection: { backgroundColor: color, nameColor: color } })
  .then((output) => {
    if (outputPath && output) {
      fs.writeFileSync(outputPath, output);
    } else {
      console.log(output);
    }
  })
  .catch((err) => {
    console.error(err);
  });
