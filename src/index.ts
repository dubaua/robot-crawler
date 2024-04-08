import { Robot } from "./robot";
import { createField, createFieldNodes, renderField } from "./utils";

const field = createField(15, 10, 4, 7)
const robot = new Robot(field, 1, 1);

createFieldNodes(field);
renderField(field, robot);

function goNext() {
  robot.next();
  renderField(field, robot);

  if (!robot.isFinished) {
    setTimeout(goNext, 100);
  }
}

goNext()
