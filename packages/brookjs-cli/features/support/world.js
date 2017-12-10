const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const { setWorldConstructor } = require('cucumber');

class CliWorld {
    constructor ({ attach, parameters }) {
        this.attach = attach;
        this.parameters = parameters;
        this.bin = path.join(__dirname, '..', '..', 'bin', 'beaver.js');
        this.cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-'));
        this.output = {
            stdout: '',
            stderr: '',
            closed: false,
            code: null
        };
        this.defaultRc = {
            path: '.beaverrc.js',
            contents: `export const dir = 'src';`
        };
    }

    async createProjectWith(files) {
        const create = [this.defaultRc, ...files];

        await Promise.all(create.map(file => this.outputFile(file)));
    }

    outputFile (file) {
        return fs.outputFile(path.join(this.cwd, file.path), file.contents);
    }

    appendFile (file) {
        return fs.appendFile(path.join(this.cwd, file.path), file.contents);
    }

    getBarrel(barrel) {
        return fs.readFile(path.join(this.cwd, 'src', barrel, 'index.js'), 'utf-8');
    }

    getFile(file, barrel) {
        return fs.readFile(path.join(this.cwd, 'src', barrel, file), 'utf-8');
    }

    run(command) {
        const args = [this.bin, ...command.split(' ')];

        this.spawned = spawn(args[0], args.slice(1), { cwd: this.cwd });
        this.spawned.stdin.setEncoding('utf-8');

        this.spawned.stdout.on('data', data => {
            this.output.stdout += data.toString();
        });

        this.spawned.stderr.on('data', data => {
            this.output.stderr += data.toString();
        });

        this.spawned.on('close', code => {
            this.output.closed = true;
            this.output.code = code;
        });
    }

    async respondTo(questions) {
        for (const question of questions) {
            await this.outputMatches(question.text);
            this.spawned.stdin.write(question.response);
        }
    }

    removeNodeModules(app) {
        return new Promise(resolve => {
            rimraf(path.join(app, 'node_modules'), resolve);
        });
    }

    outputMatches(matches) {
        return new Promise(resolve => {
            const loop = () => {
                if (this.output.stdout.trim().includes(matches)) {
                    resolve();
                } else {
                    setTimeout(loop, 200);
                }
            };

            loop();
        });
    }

    ended() {
        return new Promise(resolve => {
            const loop = () => {
                if (this.output.closed === true) {
                    resolve(this.output.code);
                } else {
                    setTimeout(loop, 200);
                }
            };

            loop();
        });
    }
}

setWorldConstructor(CliWorld);
