import {UIVStackView} from "./Stack";
import {Text, TEXT_STYLE} from "./Text";
import {TextField} from "./TextField";

export class UILabelTextFieldView extends UIVStackView {
    constructor (label, name, type, placeholder, formater) {
        super(
            Text(label, TEXT_STYLE.label),
            TextField(name, type, placeholder, formater)
                .margin(8, 0, 0, 0)
        );
        this.label = label;
        this.name = name;
        this.type = type;
        this.placeholder = placeholder;
        this.formater = formater;
    }
}

export function LabelTextField(label, name, type, placeholder, formater) {
    return new UILabelTextFieldView(label, name, type, placeholder, formater);
}
