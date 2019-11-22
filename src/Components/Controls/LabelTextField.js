import { VStack} from "../Layouts/Stack";
import {Text, TEXT_STYLE} from "./Text";
import {TextField} from "./TextField";
import {View} from "../View";
import {colors, EmptyView} from "../..";

export const LabelTextField = (label, name, value, type, placeholder) => ({
    ...View(),
    textField: TextField(name, value, type, placeholder),
    value: "",
    helperMessage: null,
    setValue(value) {
        this.value = value;
        return this;
    },
    setHelperMessage(msg) {
        this.helperMessage = msg;
        return this;
    },
    onChangeHandler: () => {},
    onChange(cb) {
        this.textField.onChangeHandler = cb;
        return this;
    },
    autoSize() {
        this.textField.autoSize();
        return this;
    },
    get children() {
        return [
            VStack(
                Text(label, TEXT_STYLE.label),
                this.textField.marginTop(4),
                this.helperMessage ? Text(this.helperMessage, TEXT_STYLE.caption)
                    .color(colors.grey["300"])
                    .marginTop(4) : EmptyView()
            )
        ]
    }
});
