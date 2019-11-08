import { App} from './cli';
import { BuildCommand, NewCommand, TestCommand } from './commands';
import * as s from './services';

const create = ({ services = s }: { services?: typeof s } = {}) =>
  App.create('beaver')
    .registerServices(services)
    .addCommand(new NewCommand())
    .addCommand(new BuildCommand())
    .addCommand(new TestCommand());

export default create;
